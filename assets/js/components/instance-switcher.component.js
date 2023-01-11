/**
 * <instance-switcher>
 * -----------------------------------------------------------------------------
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent("instance-switcher", {

    //  ╔═╗╦ ╦╔╗ ╦  ╦╔═╗  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝║ ║╠╩╗║  ║║    ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╚═╝╚═╝╩═╝╩╚═╝  ╩  ╩╚═╚═╝╩  ╚═╝
    "props": [],

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╦╔╗╔╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ║║║║ ║ ║╣ ╠╦╝║║║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╩╝╚╝ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": function data() {
        return {
            "logger":       null,
            "plugin":       null,
            "form":         null,
            "instance":     null,
            "instanceList": [],
        };
    },

    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    "template": `
<div class="btn-group ml-1" role="group" ref="instance-switcher">
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" v-if="instanceList.length > 0">{{ instance ? instance.name : "..." }}</button>
    <div class="dropdown-menu">
      <div class="dropdown-item" style="cursor: pointer;" v-for="i in instanceList" @click="changeInstance(i)">{{ i.name }}</div>
    </div>
  </div>
  <a href="./new" class="btn btn-secondary">
    <i aria-hidden="true" class="fa fa-plus-circle"></i>
  </a>
</div>
  `,

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "mounted": async function mounted() {
        this.instanceList = SAILS_LOCALS.savedInstances;
        if (!this.instanceList || !this.instanceList.length) {
            throw new Error("No instances list received, so cannot start instance switcher");
        }
        this.plugin = this.$parent.pluginName;
        this.instance = this.instanceList.find((i) => i.id === Number(localStorage.getItem(`instance-${this.plugin}`)));
        this.logger = this.$parent.$refs.logger;
        this.form = this.$parent.$refs.form;

        if (this.instance) {
            this.changeInstance(this.instance);
        } else if (!this.instance && this.instanceList.length > 0) {
            this.changeInstance(this.instanceList[0]);
        }
    },

    "beforeDestroy": async function beforeDestroy() {
        return {};
    },

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
    "methods": {
        "changeInstance": function changeInstance(instance) {
            this.instance = instance;
            localStorage.setItem(`instance-${this.plugin}`, instance.id);

            if (this.logger) {
                this.logger.changeRoom(`log-${instance.id}`);
            }

            if (this.form) {
                this.$parent.instance = instance;
                this.$parent.buildForm();
            }
        },
    },

});
