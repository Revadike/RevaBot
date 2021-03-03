let PluginList = { ...require("./resources/PluginList.js") };
try {
    PluginList = { ...PluginList, ...require("./resources/PluginList.my.js") };
} catch (error) {
    // Assuming no private plugin list
}

class PluginManager {

    static getInstanceSettings(name) {
        let { Database } = PluginManager.instances;
        if (!Database) {
            // Load default settings?
            throw new Error("Database must be initialized first");
        }

        return Database.getInstanceSettings(name);
    }

    static async createInstance(name) {
        let pkg = PluginList[name];
        let Plugin = require(pkg);
        let settings = await PluginManager.getInstanceSettings(name);
        let instance = new Plugin(settings);
        return instance;
    }

    static async getInstance(name) {
        if (!PluginManager.instances[name]) {
            PluginManager.instances[name] = await PluginManager.createInstance(name);
        }

        return PluginManager.instance[name];
    }

    static loadAll() {
        Object.keys(PluginList).forEach(name => PluginManager.createInstance(name));
    }

}

module.exports = { PluginManager };
