module.exports = {

    "friendlyName": "Change plugin settings",
    "description":  "Change plugin settings",
    "inputs":       {
        "id": {
            "description": "The id of the plugin instance.",
            "type":        "number",
            "example":     1,
            "required":    true,
        },
        "settings": {
            "description": "The new settings of the plugin instance.",
            "type":        {},
            "example":     {},
            "required":    true,
        },
    },
    "exits": {},

    "fn": async function fn({ id, settings }) {
        let { name } = settings;
        await Instance.updateOne({ id }).set({ name, settings });

        sails.hooks.pluginmanager.reloadInstance(id);
    },

};
