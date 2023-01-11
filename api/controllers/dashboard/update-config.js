module.exports = {

    "friendlyName": "Update config",
    "description":  "Update the application config.",
    "inputs":       {
        "id":               { "type": "string" },
        "baseUrl":          { "type": "string" },
        "port":             { "type": "number" },
        "datastoreAdapter": { "type": "string" },
        "datastoreUrl":     { "type": "string" },
    },
    "fn": async function fn({ id, baseUrl, port, datastoreAdapter, datastoreUrl }) {
        // Save to the db
        await Config.updateOne({ id })
            .set({ baseUrl, port, datastoreAdapter, datastoreUrl });
    },

};
