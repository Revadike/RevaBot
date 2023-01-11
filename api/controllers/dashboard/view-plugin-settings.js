module.exports = {

    "friendlyName": "View plugin settings",
    "description":  "Display \"Plugin settings\" page.",
    "exits":        {
        "success":  { "viewTemplatePath": "pages/dashboard/plugin-settings" },
        "notFound": {
            "viewTemplatePath": "404",
            "description":      "Display the 404 page.",
            "statusCode":       404,
        },
        "redirect": {
            "responseType": "redirect",
            "description":  "There are no saved instances, so redirect to the new instance page.",
        },
    },

    "fn": async function fn(inputs, exits) {
        let pluginName = this.req.param("plugin");
        let plugin = await sails.hooks.pluginmanager.getPlugin(pluginName).catch(() => false);
        if (plugin) {
            let form = await sails.hooks.pluginmanager.getPluginForm(pluginName);
            let savedInstances = await Instance.find({ pluginName });
            if (savedInstances.length === 0) {
                throw { "redirect": `/plugin/${pluginName}/new` };
            }
            exits.success({
                form,
                plugin,
                pluginName,
                savedInstances,
            });
        } else {
            throw "notFound";
        }
    },

};
