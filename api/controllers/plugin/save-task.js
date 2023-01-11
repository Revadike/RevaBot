module.exports = {

    "friendlyName": "Save plugin task",
    "description":  "Save plugin task",
    "inputs":       {
        "id": {
            "description": "The id of the task.",
            "type":        "number",
            "example":     1,
            "required":    false,
        },
        "data": {
            "description": "The new data of the task.",
            "type":        {},
            "example":     {},
            "required":    true,
        },
    },
    "exits": {},

    "fn": async function fn({ id, data }) {
        let { name, type, pluginName, instanceId } = data;
        if (!name || !type || !pluginName || !instanceId) {
            throw new Error("Missing required parameters");
        }
        if (type !== "onetime") {
            if (id) {
                data = await Task.updateOne({ id }).set(data);
            } else {
                data = await Task.create(data).fetch();
            }
        }
        if (type === "onetime" && id) {
            await Task.destroyOne({ id });
        }

        sails.hooks.taskscheduler.scheduleTask(data);
    },

};
