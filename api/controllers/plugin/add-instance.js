module.exports = {

    "friendlyName": "Add new instance",
    "description":  "Add new instance",
    "inputs":       {
        "name": {
            "description": "The instance name.",
            "example":     "instance",
            "required":    true,
        },
        "pluginName": {
            "description": "The plugin name.",
            "example":     "plugin",
            "required":    true,
        },
        "settings": {
            "description": "The settings of the plugin instance.",
            "type":        {},
            "example":     {},
            "required":    true,
        },
    },
    "exits": {},

    "fn": async function fn({ name, pluginName, settings }) {
        let { id } = await Instance.create({ name, pluginName, settings }).fetch();
        let Plugin = await sails.hooks.pluginmanager.getPlugin(pluginName);

        await sails.hooks.pluginmanager.createInstance(id, Plugin, settings);
    },

};
