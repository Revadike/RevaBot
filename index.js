const { Database } = require("./classes/Database");
const { WebAdmin } = require("./classes/WebAdmin");
const { PluginManager } = require("./PluginManager");
const Config = require("config.js");

// Init DB
let database = new Database(Config.database);
let webadmin = new WebAdmin(Config.webadmin);
PluginManager.instances = {
    "Database": database,
    "WebAdmin": webadmin,
};

// Init Plugins
PluginManager.loadAll();

// Init Tasks & Events

// class RevaBot {
// }
// module.exports = { RevaBot };
