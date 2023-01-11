parasails.registerPage("edit-task", {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": { },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount": function beforeMount() {
    // …
    },
    "mounted": async function mounted() {
        document.addEventListener("change", (evt) => {
            let { id, value } = evt.target;
            switch (true) {
                case id.endsWith("-Input-name"):
                    this.buildForm(value);
                    break;
                case id.endsWith("-Input-type0"):
                    this.FormHider("onetime");
                    break;
                case id.endsWith("-Input-type1"):
                    this.FormHider("cron");
                    break;
                case id.endsWith("-Input-type2"):
                    this.FormHider("event");
                    break;
                case id.endsWith("-Input-instanceId"):
                    localStorage.setItem(`instance-${SAILS_LOCALS.pluginName}`, value);
                    this.buildForm();
                    break;
                default:
                    break;
            }
        });

        this.buildForm();
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {
        "buildForm": function buildForm(taskName, name = "default") {
            if (window.jsonForm) {
                window.jsonForm.destroy(name);
                delete window.jsonForm.formInstances[name];
            } else {
                window.jsonForm = new JsonForm();
            }

            let {
                allAvailableEvents,
                availableTasks,
                pluginName,
                savedInstances,
                savedTask,
                taskId,
            } = SAILS_LOCALS;

            taskName = taskName || Object.keys(availableTasks)[0];
            let eventOptions = {};
            for (let instanceId in allAvailableEvents) {
                let events = allAvailableEvents[instanceId];
                for (let eventName of events) {
                    let key = `${instanceId},${eventName}`;
                    let instance = savedInstances.find((instance) => instance.id === Number(instanceId));
                    let value = `${instance.name} - ${eventName}`;
                    eventOptions[key] = value;
                }
            }

            let form = {
                "hide_validation":    false,
                "button_orientation": "left",
                "fields":             [
                    {
                        "id":   "basic_header",
                        "name": "basic_header",
                        "type": "html",
                        "html":
                            `<div class="col-12 row mb-3">
                                <div class="col-sm">
                                    <hr><h4>Basic Info</h4>
                                </div>
                            </div>`,
                    },
                    {
                        "id":    "pluginName",
                        "name":  "pluginName",
                        "type":  "field",
                        "field": {
                            "type":          "hidden",
                            "default_value": pluginName,
                            "readonly":      true,
                        },
                    },
                    {
                        "id":    "instanceId",
                        "name":  "Instance",
                        "type":  "field",
                        "field": {
                            "type":          "select",
                            "options":       _.zipObject(_.map(savedInstances, "id"), _.map(savedInstances, "name")),
                            "width":         "6",
                            "default_value": localStorage.getItem(`instance-${SAILS_LOCALS.pluginName}`),
                        },
                    },
                    {
                        "id":    "name",
                        "name":  "Task",
                        "type":  "field",
                        "field": {
                            "type":    "select",
                            "options": _.transform(availableTasks,
                                (result, value, key) => {
                                    result[key] = value.title || value.name;
                                },
                                {}),
                            "width":         "6",
                            "default_value": taskName,
                        },
                    },
                    {
                        "id":    "type",
                        "name":  "Run at",
                        "type":  "field",
                        "field": {
                            "type":          "radio",
                            "default_value": "onetime",
                            "options":       {
                                "onetime": "One-time",
                                "cron":    "Cron",
                                "event":   "Event",
                            },
                            "width": "6",
                        },
                    },
                    {
                        "id":    "cron",
                        "name":  "Cron",
                        "type":  "field",
                        "field": {
                            "type":        "text",
                            "required":    false,
                            "placeholder": "",
                            "helptext":    "Visit crontab.guru for help!",
                        },
                    },
                    {
                        "id":    "event",
                        "name":  "Event name",
                        "type":  "field",
                        "field": {
                            "type":     "select",
                            "required": false,
                            "options":  _.isEmpty(eventOptions) ? [] : eventOptions,
                        },
                    },
                ],
            };

            let { formFields } = availableTasks[taskName];
            if (formFields && formFields.length > 0) {
                form.fields.push(
                    {
                        "id":   "basic_header",
                        "name": "basic_header",
                        "type": "html",
                        "html":
                            `<div class="col-12 row mb-3">
                                <div class="col-sm">
                                    <hr><h4>Additional Settings</h4>
                                </div>
                            </div>`,
                    },
                    ...formFields,
                );
            }
            form.submit_button_text = "Save Task";

            // if editing an existing task, load the form with the existing values
            let selected = null;
            if (taskId) {
                for (let i = 0; i < form.fields.length; i++) {
                    let { id } = form.fields[i];
                    let value = savedTask[id] || savedTask.settings[id];
                    if (value) {
                        form.fields[i].field.default_value = value;
                        if (id === "type") {
                            selected = value;
                        }
                    }
                }
            }

            window.jsonForm.create("#form", form, name);
            window.jsonForm.registerSubmit(this.FormHandler, name);

            this.FormHider(selected);
        },
        "FormHider": function FormHider(selected) {
            selected = selected || "onetime";
            let $cronNode = $("#form input[id*='-Input-cron']");
            let $eventNode = $("#form select[id*='-Input-event']");
            switch (selected) {
                case "onetime":
                    $cronNode.parent().hide();
                    $eventNode.parent().hide();
                    break;
                case "cron":
                    $cronNode.parent().show();
                    $eventNode.parent().hide();
                    break;
                case "event":
                    $cronNode.parent().hide();
                    $eventNode.parent().show();
                    break;
                default:
                    $cronNode.parent().hide();
                    $eventNode.parent().hide();
                    break;
            }
        },
        "FormHandler": function FormHandler(valid, data) {
            if (valid) {
                // remove unused/invalid values
                switch (data.type) {
                    case "onetime":
                        data.cron = "";
                        data.event = "";
                        break;
                    case "cron":
                        data.event = "";
                        break;
                    case "event":
                        data.cron = "";
                        break;
                    default:
                        break;
                }

                // fix event format
                if (data.event) {
                    let [eventInstanceId, eventName] = data.event.split(/,(.*)/);
                    data.eventName = eventName;
                    data.eventInstanceId = eventInstanceId;
                }
                delete data.event;

                // push all non-standard fields to settings
                let standardKeys = ["name", "instanceId", "pluginName", "type", "cron", "eventName", "eventInstanceId"];
                let settings = {};
                for (let key in data) {
                    if (standardKeys.includes(key)) {
                        continue;
                    }
                    settings[key] = data[key];
                    delete data[key];
                }
                data.settings = settings;

                // save task
                let { taskId, pluginName } = SAILS_LOCALS;
                taskId = taskId || undefined; // null id not allowed
                Cloud.saveTask
                    .with({ "id": taskId, data })
                    .then(() => {
                        // eslint-disable-next-line no-alert
                        alert("Saved");
                        location.href = `/plugin/${pluginName}/scheduler`;
                    });
            } else {
                // eslint-disable-next-line no-alert
                alert("Form is NOT VALID. Did you fill out all fields?");
            }
        },
    },
});
