/**
 * Config.js
 *
 * The configuration of this application.
 */

module.exports = {
    "datastore":  "default",
    "attributes": {
        "baseUrl": {
            "type":       "string",
            "defaultsTo": "http://localhost",
        },
        "port": {
            "type":       "number",
            "defaultsTo": 1337,
        },
        "defaultLocale": {
            "type":       "string",
            "defaultsTo": "en",
        },
        "datastoreAdapter": {
            "type":       "string",
            "defaultsTo": "sails-disk",
            "isIn":       ["sails-disk", "sails-mongo", "sails-mysql", "sails-postgresql"],
        },
        "datastoreUrl": {
            "type":   "string",
            "custom": (value) => {
                if (value === "") {
                    return true;
                }
                return /^(postgresql|mysql|mongodb):\/\/[^:]+(:[^@]+)?@[^:]+:[0-9]+\/[^/]+$/.test(value);
            },
            "required":   false,
            "defaultsTo": "",
        },
    },

};
