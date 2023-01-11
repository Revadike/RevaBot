module.exports = {
    "friendlyName": "Renew API key",
    "description":  "Give a new API key for the logged-in user.",
    "fn":           async function fn() {
        const crypto = require("crypto");
        let apiKey = crypto.randomBytes(16).toString("hex");
        await User.updateOne({ "id": this.req.me.id })
            .set({ apiKey });
    },
};
