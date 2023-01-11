/**
 * <account-notification-banner>
 * -----------------------------------------------------------------------------
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent("account-notification-banner", {

    //  ╔═╗╦ ╦╔╗ ╦  ╦╔═╗  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝║ ║╠╩╗║  ║║    ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╚═╝╚═╝╩═╝╩╚═╝  ╩  ╩╚═╚═╝╩  ╚═╝
    "props": [],

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╦╔╗╔╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ║║║║ ║ ║╣ ╠╦╝║║║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╩╝╚╝ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": () => ({ "notificationText": "" }),

    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    "template": `
  <div>
    <div class="container-fluid">
      <div class="alert alert-warning mt-2 small" role="alert" v-if="notificationText">
        {{notificationText}}
      </div>
    </div>
  </div>
  `,

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "mounted": async function mounted() {
        await Cloud.observeMySession();
        // Listen for updates to the user's session
        Cloud.on("session", (msg) => {
            if (msg.notificationText) {
                this.notificationText = msg.notificationText;
            } else {
                this.notificationText = "";
            }
        });// œ
    },

    "beforeDestroy": async() => {
        Cloud.off("session");
    },

    "watch": { "loggedInUserId"(unused) { throw new Error("Changes to `loggedInUserId` are not currently supported in <account-notification-banner>!"); } },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╦ ╦╔═╗╔╗╔╔╦╗╦  ╔═╗╦═╗╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝║║║╠═╣║    ║╣ ╚╗╔╝║╣ ║║║ ║   ╠═╣╠═╣║║║ ║║║  ║╣ ╠╦╝╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╚═╝ ╚╝ ╚═╝╝╚╝ ╩   ╩ ╩╩ ╩╝╚╝═╩╝╩═╝╚═╝╩╚═╚═╝

    // …

    //  ╔═╗╦ ╦╔╗ ╦  ╦╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ╠═╝║ ║╠╩╗║  ║║    ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩  ╚═╝╚═╝╩═╝╩╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
    // > Public methods are rarely exposed by Vue components, but sometimes they
    // > are an important escape hatch.  They are callable via something like
    // > `this.$refs.componentNameInCamelCase.doSomething())`, and, by convention,
    // > are always prefixed with "do".
    // N/A

    //  ╔═╗╦═╗╦╦  ╦╔═╗╔╦╗╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ╠═╝╠╦╝║╚╗╔╝╠═╣ ║ ║╣   ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩  ╩╚═╩ ╚╝ ╩ ╩ ╩ ╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝

    // …

    "methods": {},

});
