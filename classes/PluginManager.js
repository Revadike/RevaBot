const globalModules = require("global-modules");
const readPkgs = require("read-pkgs");
const path = require("path");

module.exports = class PluginManager {

    static instances = {}

    static getInstanceSettings(name) {
        let { database } = PluginManager.instances;
        if (!database) {
            // Load default settings?
            throw new Error("Database must be initialized first");
        }

        return database.getInstanceSettings(name);
    }

    static async createInstance(name, location) {
        name = name.replace("@revaplugin/", "");
        if (PluginManager.instances[name]) {
            return PluginManager.instances[name];
        }

        let Plugin = require(path.resolve(location));
        let settings = await PluginManager.getInstanceSettings(name);
        let instance = new Plugin(settings);
        PluginManager.instances[name] = instance;
        return instance;
    }

    static async getInstance(name) {
        if (!PluginManager.instances[name]) {
            await PluginManager.createInstance(name);
        }

        return PluginManager.instances[name];
    }

    static async loadAll() {
        let pkgLocations = [
            "../@revaplugin/*",
            "./npm_modules/@revaplugin/*",
            `${globalModules}/@revaplugin/*`,
        ];

        let pkgs = await readPkgs(pkgLocations);
        await Promise.all(pkgs.map(({ directory, pkg }) => PluginManager.createInstance(pkg.name, directory)));
    }

};
