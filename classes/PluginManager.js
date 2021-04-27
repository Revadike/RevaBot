const globalModules = require("global-modules");
const readPkgs = require("read-pkgs");

class PluginManager {

    static getInstanceSettings(name) {
        let { Database } = PluginManager.instances;
        if (!Database) {
            // Load default settings?
            throw new Error("Database must be initialized first");
        }

        return Database.getInstanceSettings(name);
    }

    static async createInstance(name, location) {
        name = name.replace("@revaplugin/", "");
        let Plugin = require(location);
        let settings = await PluginManager.getInstanceSettings(name);
        let instance = new Plugin(settings);
        PluginManager.instances[name] = instance;
    }

    static async getInstance(name) {
        if (!PluginManager.instances[name]) {
            await PluginManager.createInstance(name);
        }

        return PluginManager.instances[name];
    }

    static async loadAll() {
        let pkgs = await readPkgs(`(./npm_modules/*|${globalModules}/*)`);

        // [{directory: packages/packageOne, pkg: PACKAGEDATA}, {directory: packages/packageTwo, pkg: PACKAGEDATA}]
        pkgs.forEach((pkg) => PluginManager.createInstance(pkg.name, pkg.directory));
    }

}

module.exports = { PluginManager };
