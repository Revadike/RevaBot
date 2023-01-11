module.exports = {

    "friendlyName": "Remove plugin",
    "description":  "Remove an installed plugin.",
    "inputs":       {
        "name": {
            "description": "The name of the plugin needed to be removed.",
            "example":     "bartervg",
            "required":    true,
        },
    },
    "notFound": { "statusCode": 404 },
    "fn":       async function fn({ name }) {
        let plugin = await sails.hooks.pluginmanager.getPlugin(name);
        if (!plugin) {
            throw "notFound";
        }

        let pkg = plugin._package;
        await sails.hooks.pluginmanager.removePlugin(pkg.name, { "targetDir": plugin._directory });
    },

};
