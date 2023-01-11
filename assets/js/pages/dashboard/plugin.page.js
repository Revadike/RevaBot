parasails.registerPage("plugin", {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": {
        // Main syncing/loading state for this page.
        "syncingRemovePlugin": false,
        "syncingUpdatePlugin": false,

        // Form data
        "formData": { /* … */ },

        // For tracking client-side validation errors in our form.
        // > Has property set to `true` for each invalid property in `formData`.
        "formErrors": { /* … */ },

        // Form rules
        "formRules": { "name": { "required": true } },

        // Server error state for the form
        "cloudError": "",

        "pageLoadedAt": Date.now(),
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount": function beforeMount() {
        this.formData.name = this.name;
    },
    "mounted": async function mounted() {
    // …
    },

    //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
    //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
    // Configure deep-linking (aka client-side routing)
    "virtualPagesRegExp": /^\/plugin\/?([^/]+)?\/?/,
    "afterNavigate":      async function afterNavigate(virtualPageSlug) {
    // `virtualPageSlug` is determined by the regular expression above, which
    // corresponds with `:unused?` in the server-side route for this page.
        switch (virtualPageSlug) {
            default:
                break;
        }
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {
        "_resetForms": async function _resetForms() {
            this.cloudError = "";
            this.formData = {};
            this.formRules = {};
            this.formErrors = {};
            await this.forceRender();
        },
        "submittedForm": async function submittedForm() {
            // Redirect to a different web page on success.
            // > (Note that we re-enable the syncing state here.  This is on purpose--
            // > to make sure the spinner stays there until the page navigation finishes.)
            this.syncingRemovePlugin = true;
            window.location = "/welcome";
        },

    },
});
