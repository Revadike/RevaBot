parasails.registerPage("new-instance", {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": { "pluginName": null },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount": function beforeMount() {
    // …
    },
    "mounted": async function mounted() {
        this.pluginName = SAILS_LOCALS.pluginName;
        window.jsonForm = new JsonForm();
        let { form } = SAILS_LOCALS;
        window.jsonForm.create("#form", form);
        window.jsonForm.registerSubmit(this.FormHandler);
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {
        "FormHandler": function FormHandler(valid, data) {
            if (valid) {
                let { name } = data;
                delete data.name;
                Cloud.addInstance
                    .with({ name, "pluginName": this.pluginName, "settings": data })
                    .then(() => {
                        // eslint-disable-next-line no-alert
                        alert("Saved");
                        location.reload();
                    });
            } else {
                // eslint-disable-next-line no-alert
                alert("Form is NOT VALID. Did you fill out all fields?");
            }
        },
    },
});
