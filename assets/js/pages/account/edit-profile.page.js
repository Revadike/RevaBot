parasails.registerPage("edit-profile", {
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
            "name":         { "required": true },
            "emailAddress": { "required": true, "isEmail": true },
        },

        // Server error state for the form
        "cloudError": "",
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount"() {
    // Set the form data.
        this.formData.name = this.me.name;
        this.formData.emailAddress = this.me.emailChangeCandidate ? this.me.emailChangeCandidate : this.me.emailAddress;
    },
    "mounted": async function mounted() {
    // …
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {

        "submittedForm": async function submittedForm() {
            // Redirect to the account page on success.
            // > (Note that we re-enable the syncing state here.  This is on purpose--
            // > to make sure the spinner stays there until the page navigation finishes.)
            this.syncing = true;
            window.location = "/account";
        },

    },
});
