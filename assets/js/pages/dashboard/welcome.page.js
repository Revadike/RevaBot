parasails.registerPage("welcome", {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": {
        "modal":        "",
        "pageLoadedAt": Date.now(),
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount": function beforeMount() {
    // …
    },
    "mounted": async function mounted() {
    // …
    },

    //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
    //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
    // Configure deep-linking (aka client-side routing)
    "virtualPagesRegExp": /^\/welcome\/?([^/]+)?\/?/,
    "afterNavigate":      async function afterNavigate(virtualPageSlug) {
    // `virtualPageSlug` is determined by the regular expression above, which
    // corresponds with `:unused?` in the server-side route for this page.
        switch (virtualPageSlug) {
            case "hello":
                this.modal = "example";
                break;
            default:
                this.modal = "";
        }
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {

        "clickOpenExampleModalButton": async function clickOpenExampleModalButton() {
            this.goto("/welcome/hello");
            // Or, without deep links, instead do:
            // ```
            // this.modal = 'example';
            // ```
        },

        "closeExampleModal": async function closeExampleModal() {
            this.goto("/welcome");
            // Or, without deep links, instead do:
            // ```
            // this.modal = '';
            // ```
        },

    },
});
