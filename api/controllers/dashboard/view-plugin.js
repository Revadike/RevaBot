module.exports = {
    "friendlyName": "View plugin page",
    "description":  "Display the dashboard \"Plugin\" page.",
    "exits":        {
        "success": {
            "viewTemplatePath": "pages/dashboard/plugin",
            "description":      "Display the plugin page for authenticated users.",
        },
        "notFound": {
            "viewTemplatePath": "404",
            "description":      "Display the 404 page.",
            "statusCode":       404,
        },
    },
    "fn": async function fn(inputs, exits) {
        const Marked = require("marked");
        let name = this.req.param("plugin");
        let plugin = await sails.hooks.pluginmanager.getPlugin(name);
        if (plugin) {
            let readme = Marked(plugin._readme);
            exits.success({ plugin, name, readme });
        } else {
            throw "notFound";
        }
    },

};
