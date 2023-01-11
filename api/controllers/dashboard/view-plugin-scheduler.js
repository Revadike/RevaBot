module.exports = {

    "friendlyName": "View plugin scheduler",
    "description":  "Display \"Plugin scheduler\" page.",

    "exits": {
        "success": {
            "viewTemplatePath": "pages/dashboard/plugin-scheduler",
            "description":      "Display the plugin page for authenticated users.",
        },
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
        let plugin = await sails.hooks.pluginmanager.getPlugin(pluginName);
        if (plugin) {
            let savedInstances = await Instance.find({ pluginName });
            if (savedInstances.length === 0) {
                throw { "redirect": `/plugin/${pluginName}/new` };
            }
            let savedTasks = await Task.find({ pluginName });
            let availableTasks = await plugin.getTasks();
            exits.success({ plugin, pluginName, savedInstances, availableTasks, savedTasks });
        } else {
            throw "notFound";
        }
    },

};
