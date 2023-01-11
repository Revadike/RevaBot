const Cron = require("node-cron");
const PluginManager = require("./PluginManager");

module.exports = class TaskScheduler {

    static schedule = {};

    static stopEventTask(id, eventName, eventInstanceId) {
        PluginManager.instances[eventInstanceId].removeListener(eventName, this.schedule[id]);
    }

    static stopCronTask(id) {
        this.schedule[id].stop();
    }

    static stopTask(task) {
        let { id, type, eventName, eventInstanceId } = task;

        switch (type) {
            case "cron":
                this.stopCronTask(id);
                break;
            case "event":
                this.stopEventTask(id, eventName, eventInstanceId);
                break;
            default:
                break;
        }
    }

    /**
     * Schedule a task
     * @param {Object} task - The task to schedule
     * @returns {undefined} - Nothing
     */
    static scheduleTask(task) {
        let { id, type, name, instanceId, cron, eventName, eventInstanceId, settings } = task;
        if (this.schedule[id]) {
            this.stopTask(task);
        }

        switch (type) {
            // Run on cron
            case "cron":
                this.schedule[id] = Cron.schedule(cron, () => PluginManager.instances[instanceId][name](settings));
                break;

            // TODO: Multi-event support?
            // Run on event
            case "event":
                this.schedule[id] = (...eventArgs) => {
                    PluginManager.instances[instanceId][name](settings, eventArgs);
                };
                PluginManager.instances[eventInstanceId].on(eventName, this.schedule[id]);
                break;

            // Run now
            default:
                PluginManager.instances[instanceId][name](settings);
                break;
        }
    }

    static scheduleTasks(tasks) {
        for (let task of tasks) {
            this.scheduleTask(task);
        }
    }

};
