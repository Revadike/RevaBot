module.exports = {

    "friendlyName": "Logger",
    "description":  "Broadcasts the log",

    "inputs": {
        "roomName": {
            "description": "The name of the socket room, which broadcasts the appropriate log.",
            "example":     "log-application",
            "required":    false,
        },
    },
    "exits": { "success": { "description": "The requesting socket is now subscribed to logging." } },

    "fn": async function fn({ roomName }) {
        if (!this.req.isSocket) {
            throw new Error("This action is designed for use with the virtual request interpreter (over sockets, not traditional HTTP).");
        }

        sails.sockets.join(this.req, roomName || "log-application");
    },

};
