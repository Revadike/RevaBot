/**
 * <logger>
 * -----------------------------------------------------------------------------
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent("logger", {

    //  ╔═╗╦ ╦╔╗ ╦  ╦╔═╗  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝║ ║╠╩╗║  ║║    ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╚═╝╚═╝╩═╝╩╚═╝  ╩  ╩╚═╚═╝╩  ╚═╝
    "props": ["roomName"],

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╦╔╗╔╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ║║║║ ║ ║╣ ╠╦╝║║║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╩╝╚╝ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    "data": function data() {
        return { "room": null };
    },

    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    "template": `
<div class="card mb-3" style="height: 18rem;" ref="logger">
    <div class="card-header" ref="header">Log</div>
    <div class="card-body bg-dark" ref="body" style="overflow-y: scroll;">
    </div>
</div>
  `,

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    "mounted": async function mounted() {
        let { body } = this.$refs;
        let $body = $(body);

        // Stop the animation if the user scrolls. Defaults on .stop() should be fine
        $body.bind("scroll mousedown DOMMouseScroll mousewheel keyup touchstart", (e) => {
            if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel" || e.type === "touchstart") {
                $body.stop();
            }
        });

        // Listen for updates to the user's session
        Cloud.on("log", ({ timestamp, message }) => {
            let log = DOMPurify.sanitize(message);
            $(`<pre id="log_${timestamp}" class="logger-line text-white" style="display: none; margin: 0px;">${log}</pre>`).appendTo(body)
                .show("slow");

            // scroll to bottom
            let curScrollHeight = body.scrollTop + body.offsetHeight;
            if (curScrollHeight + (0.1 * curScrollHeight) >= body.scrollHeight) {
                $body.stop()
                    .animate({ "scrollTop": body.scrollHeight }, 800);
            }
            if (body.children.length > 100) {
                body.children[0].remove();
            }
        });

        if (this.roomName) {
            this.room = this.roomName;
        }
        if (this.room) {
            this.changeRoom(this.room);
        }
    },

    "beforeDestroy": async function beforeDestroy() {
        Cloud.off(this.room);
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
    // > are an important escavia somepe hatch.  They are callable thing like
    // > `this.$refs.componentNameInCamelCase.doSomething())`, and, by convention,
    // > are always prefixed with "do".
    // N/A

    //  ╔═╗╦═╗╦╦  ╦╔═╗╔╦╗╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ╠═╝╠╦╝║╚╗╔╝╠═╣ ║ ║╣   ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩  ╩╚═╩ ╚╝ ╩ ╩ ╩ ╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝

    // …
    "methods": {
        "changeRoom": async function changeRoom(room) {
            this.clearLog();
            if (this.room) {
                Cloud.off(this.room);
            }
            await Cloud.logger(room);
            this.room = room;
        },
        "clearLog": function clearLog() {
            $(".logger-line").fadeOut(500, () => {
                $(".logger-line").remove();
            });
        },
    },

});
