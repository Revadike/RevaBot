module.exports = {

    "friendlyName": "View new instance",
    "description":  "Display \"new instance\" page.",
    "exits":        {
        "success":  { "viewTemplatePath": "pages/dashboard/new-instance" },
        "notFound": {
            "viewTemplatePath": "404",
            "description":      "Display the 404 page.",
            "statusCode":       404,
        },
    },

    "fn": async function fn(inputs, exits) {
        let pluginName = this.req.param("plugin");
        let plugin = await sails.hooks.pluginmanager.getPlugin(pluginName).catch(() => false);
        if (plugin) {
            let form = await sails.hooks.pluginmanager.getPluginForm(pluginName);
            exits.success({
                form,
                plugin,
                pluginName,
            });
        } else {
            throw "notFound";
        }
    },

};
