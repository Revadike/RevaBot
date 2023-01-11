/**
 * TaskScheduler hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineTaskSchedulerHook(sails) {
    const Cron = require("node-cron");

    return {
        "schedule": {},

        "stopEventTask": function stopEventTask(id, eventName, eventInstanceId) {
            sails.hooks.pluginmanager.instances[eventInstanceId].removeListener(eventName, this.schedule[id]);
        },

        "stopCronTask": function stopCronTask(id) {
            this.schedule[id].destroy();
            console.log(this.schedule[id]);
        },

        "stopTask": function stopTask(task) {
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
        },

        /**
         * Schedule a task
         * @param {Object} task - The task to schedule
         * @returns {undefined} - Nothing
         */
        "scheduleTask": function scheduleTask(task) {
            let { id, type, name, instanceId, cron, eventName, eventInstanceId, settings } = task;
            if (this.schedule[id]) {
                this.stopTask(task);
            }

            switch (type) {
                // Run on cron
                case "cron":
                    this.schedule[id] = Cron.schedule(cron, () => sails.hooks.pluginmanager.instances[instanceId][name](settings));
                    break;

                // TODO: Multi-event support?
                // Run on event
                case "event":
                    this.schedule[id] = (...eventArgs) => {
                        sails.hooks.pluginmanager.instances[instanceId][name](settings, eventArgs);
                    };
                    sails.hooks.pluginmanager.instances[eventInstanceId].on(eventName, this.schedule[id]);
                    break;

                // Run now
                default:
                    sails.hooks.pluginmanager.instances[instanceId][name](settings);
                    break;
            }
        },

        "scheduleTasks": function scheduleTasks(tasks) {
            for (let task of tasks) {
                this.scheduleTask(task);
            }
        },

        /**
         * Runs when this Sails app loads/lifts.
         */
        "initialize": async function initialize() {
            sails.log.info("Initializing custom hook (`TaskScheduler`)");

            let ormLoaded = () => new Promise((resolve) => sails.on("hook:orm:loaded", resolve));
            await ormLoaded();

            let savedTasks = await sails.models.task.find({});
            this.scheduleTasks(savedTasks);
        },

    };
};
