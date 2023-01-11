/**
 * Config.js
 *
 * The configuration of this application.
 */

module.exports = {
    "datastore":  "userdb",
    "attributes": {
        "name":       { "type": "string" },
        "pluginName": { "type": "string" },
        "settings":   {
            "type":       "json",
            "defaultsTo": {},
        },
    },

};
