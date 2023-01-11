/**
 * PluginManager hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function definePluginManagerHook(sails) {
    const globalModules = require("global-modules");
    const fs = require("fs").promises;
    const path = require("path");
    const readPkgs = require("read-pkgs");
    const npmInstall = require("npminstall");
    const npmUninstall = require("npminstall/lib/uninstall");
    const PREFIX = "@revaplugin/";

    return {

        "plugins":   {},
        "instances": {},

        "getPluginForm": async function getPluginForm(name) {
            let plugin = await this.getPlugin(name);
            let form = _.cloneDeep(plugin._form);
            for (let i = 0; i < form.fields.length; i++) {
                let { id, name, field } = form.fields[i];
                if (field.type === "instance") {
                    let savedInstances = await Instance.find({ "pluginName": field.plugin_name });
                    let options = {};
                    for (let savedInstance of savedInstances) {
                        options[savedInstance.id] = savedInstance.name;
                    }
                    form.fields[i] = {
                        id,
                        name,
                        "type":  "field",
                        "field": {
                            ...field,
                            "type": "select",
                            options,
                        },
                    };
                }
            }
            form.fields.unshift(
                {
                    "id":    "name",
                    "name":  "Instance Name",
                    "type":  "field",
                    "field": {
                        "type":        "text",
                        "placeholder": "Instance #1",
                        "helptext":    "Any preferred name. Try using an unique name, to differentiate between other instances.",
                    },
                },
                {
                    "id":    "pluginName",
                    "name":  "pluginName",
                    "type":  "field",
                    "field": {
                        "type":          "hidden",
                        "default_value": name,
                        "readonly":      true,
                    },
                },
            );
            return form;
        },

        "getInstanceTasks": function getInstanceTasks(id) {
            return this.getInstance(id).then((instance) => [...instance._taskList]);
        },

        "getInstanceEvents": function getInstanceEvents(id) {
            return this.getInstance(id).then((instance) => [...instance._eventList]);
        },

        "getEvents": async function getEvents() {
            let events = {};
            for (let instanceId in this.instances) {
                let instanceEvents = await this.getInstanceEvents(instanceId);
                events[instanceId] = instanceEvents;
            }
            return events;
        },

        "reloadInstance": async function reloadInstance(id) {
            // stop all tasks
            // destroy instance
            // create new instance
            return true || id;
        },

        "createInstances": async function createInstances(instances) {
            for (let instance of instances) {
                let { id, pluginName, settings } = instance;
                let Plugin = await this.getPlugin(pluginName);
                await this.createInstance(id, Plugin, settings);
            }
        },

        "createInstance": async function createInstance(id, Plugin, settings) {
            if (this.instances[id]) {
                return this.instances[id];
            }

            let instanceKeys = Plugin._form.fields.filter((field) => field.field && field.field.type === "instance").map((field) => field.id);
            for (let key of instanceKeys) {
                // if required is false, settings[key] can be null
                if (typeof settings[key] === "number") {
                    settings[key] = this.getInstance(settings[key]);
                }
            }
            let instance = new Plugin(id, settings);

            this.instances[id] = instance;
            await this.initInstance(id);
            return instance;
        },

        "initInstance": function initInstance(id) {
            this.getInstance(id).init();
        },

        "getInstance": function getInstance(id) {
            if (!this.instances[id]) {
                throw new Error(`Instance ${id} not found`);
            }

            return this.instances[id];
        },

        "installPlugin": function installPlugin(name, additionalOptions) {
            return npmInstall({
                "root":      process.cwd(),
                "targetDir": process.cwd(),
                "pkgs":      [
                    {
                        name,
                        "version": additionalOptions.version || "latest",
                    },
                ],
                ...additionalOptions,
            }).then(() => this.loadPlugins());
        },

        "removePlugin": function removePlugin(name, additionalOptions) {
            let options = {
                "root":      process.cwd(),
                "targetDir": process.cwd(),
                "pkgs":      [{ name }],
                ...additionalOptions,
            };
            console.log(options);
            return npmUninstall(options).then(() => this.loadPlugins());
        },

        "requirePlugin": function requirePlugin(directory) {
            return require(path.resolve(directory));
        },

        "getPlugin": async function getPlugin(name) {
            return this.plugins[name];
        },

        "loadPlugins": async function loadPlugins() {
            let pkgLocations = [
                `../${PREFIX}*`,
                `./npm_modules/${PREFIX}*`,
                `${globalModules}/${PREFIX}*`,
            ].map((e) => path.resolve(e));

            let pkgs = await readPkgs(pkgLocations);
            this.plugins = {};
            for (let { directory, pkg } of pkgs) {
                let name = pkg.name.replace(PREFIX, "").toLowerCase();
                if (name === "revaplugin" || this.plugins[name]) {
                    continue;
                }

                this.plugins[name] = this.requirePlugin(directory);
                this.plugins[name]._package = pkg;
                try {
                    let readme = await fs.readFile(path.resolve(directory, "README.md"), "utf8");
                    this.plugins[name]._readme = readme;
                } catch (unused) { /* ignore */ }
            }
            return this.plugins;
        },

        /**
         * Runs when this Sails app loads/lifts.
         */
        "initialize": async function initialize() {
            sails.log.info("Initializing custom hook (`PluginManager`)");
            await this.loadPlugins();

            let ormLoaded = () => new Promise((resolve) => sails.on("hook:orm:loaded", resolve));
            await ormLoaded();

            let savedInstances = await sails.models.instance.find({});
            await this.createInstances(savedInstances);
        },

    };
};
