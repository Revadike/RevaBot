module.exports = {

    "friendlyName": "Edit or new task",
    "description":  "Display task page.",

    "exits": {
        "success": {
            "viewTemplatePath": "pages/dashboard/edit-task",
            "description":      "Display the task page for authenticated users.",
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
        let taskId = this.req.param("taskid") || null;
        let plugin = await sails.hooks.pluginmanager.getPlugin(pluginName);
        if (plugin) {
            let savedInstances = await Instance.find({ pluginName });
            if (savedInstances.length === 0) {
                throw { "redirect": `/plugin/${pluginName}/new` };
            }
            let savedTask = {};
            if (taskId) {
                savedTask = await Task.findOne({ "id": taskId });
                if (!savedTask) {
                    throw "notFound";
                }
            }
            let allSavedInstances = await Instance.find({ });
            let availableTasks = await plugin.getTasks();
            let allAvailableEvents = await sails.hooks.pluginmanager.getEvents();
            exits.success({
                allAvailableEvents,
                allSavedInstances,
                availableTasks,
                plugin,
                pluginName,
                savedInstances,
                savedTask,
                taskId,
            });
        } else {
            throw "notFound";
        }
    },

};
