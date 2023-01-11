parasails.registerPage("account-overview", {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": {

        // Syncing/loading states for this page.
        "syncingOpenCheckout": false,
        "syncingUpdateCard":   false,
        "syncingRemoveCard":   false,

        // For <ajax-form>
        "formData":   { /* … */ },
        "formRules":  { /* … */ },
        "formErrors": { /* … */ },
        "cloudError": "",
        "syncing":    "",

        // For <modal>:
        "modal": "",

    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount": function beforeMount() {
        _.extend(this, window.SAILS_LOCALS);
    },
    "mounted": async function mounted() {
    // …
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {
        "closeModal": async function closeModal() {
            // Dismiss modal
            this.modal = "";
            await this._resetForms();
        },
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
            this.syncing = true;
            window.location = "/account";
        },

    },
});
