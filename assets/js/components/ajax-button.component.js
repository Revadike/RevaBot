/**
 * <ajax-button>
 * -----------------------------------------------------------------------------
 * A button with a built-in loading spinner.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent("ajaxButton", {
    //  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╩╚═╚═╝╩  ╚═╝
    "props": ["syncing"],

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data"() {
        return {};
    },

    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    "template": `
  <button @click="click()" type="submit" class="btn ajax-button" :class="[syncing ? 'syncing' : '']">
    <span class="button-text" v-if="!syncing"><slot name="default">Submit</slot></span>
    <span class="button-loader clearfix" v-if="syncing">
      <slot name="syncing-state">
        <span style="top: -4px; font-size: 12px; margin: 0 2px;" class="loading-dot dot1 position-relative"><small><span class="fa fa-circle"></span></small></span>
        <span style="top: -4px; font-size: 12px; margin: 0 2px;" class="loading-dot dot2 position-relative"><small><span class="fa fa-circle"></span></small></span>
        <span style="top: -4px; font-size: 12px; margin: 0 2px;" class="loading-dot dot3 position-relative"><small><span class="fa fa-circle"></span></small></span>
        <span style="top: -4px; font-size: 12px; margin: 0 2px;" class="loading-dot dot4 position-relative"><small><span class="fa fa-circle"></span></small></span>
      </slot>
    </span>
  </button>
  `,

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "beforeMount": function beforeMount() {
        return {};
    },
    "mounted": async function mounted() {
        return {};
    },
    "beforeDestroy": function beforeDestroy() {
        return {};
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    "methods": {

        "click": async function click() {
            this.$emit("click");
        },

    },
});
