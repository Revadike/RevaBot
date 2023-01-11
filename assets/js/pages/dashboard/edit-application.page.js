parasails.registerPage("edit-application", {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": {
        // Main syncing/loading state for this page.
        "syncing": false,

        // Form data
        "formData": { /* … */ },

        // For tracking client-side validation errors in our form.
        // > Has property set to `true` for each invalid property in `formData`.
        "formErrors": { /* … */ },

        // Form rules
        "formRules": {
            "id":               { "required": true },
            "baseUrl":          { "required": true },
            "port":             { "required": true },
            "datastoreAdapter": { "required": true },
            "datastoreUrl":     { "required": false },
        },

        // Server error state for the form
        "cloudError": "",
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount": async function beforeMount() {
        // Set the form data.
        this.formData = this.config;
    },
    "mounted": async function mounted() {
    // …
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {

        "submittedForm": async function submittedForm() {
            // Redirect to the settings page on success.
            // > (Note that we re-enable the syncing state here.  This is on purpose--
            // > to make sure the spinner stays there until the page navigation finishes.)
            this.syncing = true;
            window.location = "/application/settings";
        },

    },
});
