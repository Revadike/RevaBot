const Database = require("@revaplugin/database");
const PluginManager = require("./classes/PluginManager"); // TODO: Convert to RevaPlugin

(async() => {
    // Init DB
    let database = new Database();
    await database.start();

    // TODO: Dashboard (web admin panel)
    // let dashboard = new Dashboard();
    PluginManager.instances = {
        database,
        // dashboard,
    };

    // Init Plugins
    await PluginManager.loadAll();

    // Init Tasks & Events
    let taskList = Object.assign({}, ...Object.values(PluginManager.instances).map((instance) => instance.tasks));
    let eventList = [].concat(...Object.values(PluginManager.instances).map((instance) => instance.events));

    // eslint-disable-next-line no-console
    console.log({ taskList, eventList });
})();
