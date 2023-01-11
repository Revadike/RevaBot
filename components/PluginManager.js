const globalModules = require("global-modules");
const fs = require("fs").promises;
const path = require("path");
const readPkgs = require("read-pkgs");
const npmInstall = require("npminstall");
const npmUninstall = require("npminstall/lib/uninstall");
const PREFIX = "@revaplugin/";

module.exports = class PluginManager {

    static plugins = {};

    static instances = {};

    static async getPluginForm(name) {
        let plugin = await PluginManager.getPlugin(name);
        let form = _.cloneDeep(plugin._form);
        for (let i = 0; i < form.fields.length; i++) {
            let field = form.fields[i];
            if (field.field.type === "instance") {
                form.fields[i] = {
                    "id":    field.id,
                    "name":  field.name,
                    "type":  "field",
                    "field": {
                        ...field.field,
                        "type":    "select",
                        "options": Object.values(PluginManager.instances)
                            .filter((instance) => (
                                field.plugin_name
                                    ? instance._name === field.plugin_name
                                    : true
                            )),
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
    }

    static getInstanceTasks(id) {
        return PluginManager.getInstance(id).then((instance) => [...instance._taskList]);
    }

    static getInstanceEvents(id) {
        return PluginManager.getInstance(id).then((instance) => [...instance._eventList]);
    }

    static async getEvents() {
        let events = {};
        for (let instanceId in PluginManager.instances) {
            let instanceEvents = await PluginManager.getInstanceEvents(instanceId);
            events[instanceId] = instanceEvents;
        }
        return events;
    }

    static async reloadInstance(id) {
        // stop all tasks
        // destroy instance
        // create new instance
        return true || id;
    }

    static async createInstances(instances) {
        for (let instance of instances) {
            let { id, pluginName, settings } = instance;
            let Plugin = await PluginManager.getPlugin(pluginName);
            await PluginManager.createInstance(id, Plugin, settings);
        }
    }

    static async createInstance(id, Plugin, settings) {
        if (PluginManager.instances[id]) {
            return PluginManager.instances[id];
        }

        let instance = new Plugin(id, settings);

        PluginManager.instances[id] = instance;
        await PluginManager.initInstance(id);
        return instance;
    }

    static initInstance(id) {
        return PluginManager.getInstance(id).then((instance) => instance.init());
    }

    static async getInstance(id) {
        if (!PluginManager.instances[id]) {
            throw new Error(`Instance ${id} not found`);
        }

        return PluginManager.instances[id];
    }

    static installPlugin(name, additionalOptions) {
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
        }).then(() => PluginManager.loadPlugins());
    }

    static removePlugin(name, additionalOptions) {
        let options = {
            "root":      process.cwd(),
            "targetDir": process.cwd(),
            "pkgs":      [{ name }],
            ...additionalOptions,
        };
        console.log(options);
        return npmUninstall(options).then(() => PluginManager.loadPlugins());
    }

    static requirePlugin(directory) {
        return require(path.resolve(directory));
    }

    static async getPlugin(name) {
        return PluginManager.plugins[name];
    }

    static async loadPlugins() {
        sails.log.info("TESTTESTSTST");
        let pkgLocations = [
            `../${PREFIX}*`,
            `./npm_modules/${PREFIX}*`,
            `${globalModules}/${PREFIX}*`,
        ];

        let pkgs = await readPkgs(pkgLocations);
        sails.log.info({ pkgs });
        PluginManager.plugins = {};
        for (let { directory, pkg } of pkgs) {
            let name = pkg.name.replace(PREFIX, "").toLowerCase();
            if (name === "revaplugin" || PluginManager.plugins[name]) {
                continue;
            }

            PluginManager.plugins[name] = this.requirePlugin(directory);
            PluginManager.plugins[name]._package = pkg;
            try {
                let readme = await fs.readFile(path.resolve(directory, "README.md"), "utf8");
                PluginManager.plugins[name]._readme = readme;
            } catch (unused) { /* ignore */ }
        }
        return PluginManager.plugins;
    }

};
