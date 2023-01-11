parasails.registerPage("plugin-settings", {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": { "instance": null },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount": function beforeMount() {
    // …
    },
    "mounted": async function mounted() {
        this.buildForm();
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {
        "buildForm": function buildForm(name = "default") {
            if (window.jsonForm) {
                window.jsonForm.destroy(name);
                delete window.jsonForm.formInstances[name];
            } else {
                window.jsonForm = new JsonForm();
            }

            let { form } = SAILS_LOCALS;
            let saved = { "name": this.instance.name, ...this.instance.settings };
            for (let i = 0; i < form.fields.length; i++) {
                let value = saved[form.fields[i].id];
                if (value) {
                    form.fields[i].field.default_value = value;
                }
            }

            form.submit_button_text = "Save & Restart";
            window.jsonForm.create("#form", form, name);
            window.jsonForm.registerSubmit(this.FormHandler, name);
        },
        "FormHandler": function FormHandler(valid, data) {
            if (valid) {
                Cloud.changeSettings
                    .with({ "id": this.instance.id, "settings": data })
                    .then(() => {
                        // eslint-disable-next-line no-alert
                        if (confirm("Changing your instance settings will make it restart. Continue?")) {
                            // eslint-disable-next-line no-alert
                            alert("Saved");
                            location.reload();
                        }
                    });
            } else {
                // eslint-disable-next-line no-alert
                alert("Form is NOT VALID. Did you fill out all fields?");
            }
        },
    },
});
