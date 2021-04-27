const { Database } = require("./classes/Database");
const { WebAdmin } = require("./classes/WebAdmin");
const { PluginManager } = require("./PluginManager");
const Config = require("config.js");

// Init DB
let database = new Database(Config.database);
let webadmin = new WebAdmin(Config.webadmin);
PluginManager.instances = {
    database,
    webadmin,
};

// Init Plugins
PluginManager.loadAll();

// Init Tasks & Events
let taskList = [].concat(...Object.values(PluginManager.instances).map((instance) => instance.tasks));
let eventList = [].concat(...Object.values(PluginManager.instances).map((instance) => instance.events));
// eslint-disable-next-line no-console
console.log({ taskList, eventList });
