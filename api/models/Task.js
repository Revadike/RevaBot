/**
 * Config.js
 *
 * The configuration of this application.
 */

module.exports = {
    "datastore":  "userdb",
    "attributes": {
        "name":       { "type": "string" },
        "instanceId": { "type": "string" },
        "pluginName": { "type": "string" },
        "type":       {
            "type": "string",
            "isIn": ["cron", "event"],
        },
        "cron":            { "type": "string" },
        "eventName":       { "type": "string" },
        "eventInstanceId": { "type": "string" },
        "settings":        {
            "type":       "json",
            "defaultsTo": {},
        },
    },

};
