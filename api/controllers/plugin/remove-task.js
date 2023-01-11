module.exports = {

    "friendlyName": "Remove plugin task",
    "description":  "Remove plugin task",
    "inputs":       {},
    "exits":        {
        "notFound": {
            "viewTemplatePath": "404",
            "description":      "Display the 404 page.",
            "statusCode":       404,
        },
        "redirect": {
            "responseType": "redirect",
            "description":  "Back to the scheduler.",
        },
    },

    "fn": async function fn() {
        let pluginName = this.req.param("plugin");
        let id = this.req.param("taskid");
        console.log(sails.hooks.taskscheduler.schedule);
        if (!sails.hooks.taskscheduler.schedule[id]) {
            throw "notFound";
        }
        let task = await Task.findOne({ id });
        if (!task) {
            throw "notFound";
        }
        sails.hooks.taskscheduler.stopTask(task);
        await Task.destroyOne({ id });
        throw { "redirect": `/plugin/${pluginName}/scheduler` };
    },

};
