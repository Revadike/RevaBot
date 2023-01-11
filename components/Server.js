/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful,
 * such as when you deploy to a server, or a PaaS like Heroku.
 *
 * For example:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * The same command-line arguments and env vars are supported, e.g.:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/app.js
 */

// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.

const Purdy = require("purdy");
const Convert = require("ansi-to-html");
const path = require("path");
process.chdir(path.resolve(__dirname, "../"));

// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
let sails;
let rc;
try {
    sails = require("sails");
    rc = require("sails/accessible/rc");
} catch (err) {
    console.error("Encountered an error when attempting to require('sails'):");
    console.error(err.stack);
    console.error("--");
    console.error("To run an app using `node app.js`, you need to have Sails installed");
    console.error("locally (`./node_modules/sails`).  To do that, just make sure you're");
    console.error("in the same directory as your app and run `npm install`.");
    console.error();
    console.error("If Sails is installed globally (i.e. `npm install -g sails`) you can");
    console.error("also run this app with `sails lift`.  Running with `sails lift` will");
    console.error("not run this file (`app.js`), but it will do exactly the same thing.");
    console.error("(It even uses your app directory's local Sails install, if possible.)");
    return;
}// -•

module.exports = class Server {

    async getUserConfig() {
        let results = await sails.models.config.find().limit(1);
        console.log({ results });
        let result = results[0];
        return {
            "port":       result.port,
            "i18n":       { "defaultLocale": result.defaultLocale },
            "custom":     { "baseUrl": result.baseUrl },
            "datastores": {
                "userdb": {
                    "adapter": result.datastoreAdapter,
                    // "adapter": "sails-mongo",
                    // "adapter": "sails-mysql",
                    "url":     result.datastoreUrl,
                    // "url":     "mongodb+srv://revabot:xw9ITMFVw4a8UWtz@cluster0.cgptw.mongodb.net/myFirstDatabase",
                    // "url":     "mysql://revabot:xw9ITMFVw4a8UWtz@13.73.231.138:3306/revabot",
                },
            },
        };
    }

    // Assumes there is only 1 admin
    async getAdmin() {
        let admin = await sails.models.user.findOne({ "isSuperAdmin": true });
        return admin;
    }

    loadSails() {
        return new Promise((resolve, reject) => {
            sails.load(rc("sails"), async(error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(sails);
            });
        });
    }

    reloadSails(config) {
        return new Promise((resolve, reject) => {
            sails.lower((error) => {
                if (error) {
                    reject(error);
                    return;
                }
                sails = new sails.Sails();
                sails.lift(config, (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                });
            });
        });
    }

    // Start server
    async start() {
        await this.loadSails();
        let configOverride = await this.getUserConfig();
        let admin = await this.getAdmin();

        configOverride.custom.fromEmailAddress = admin.emailAddress;
        configOverride.custom.fromName = admin.name;
        configOverride.custom.internalEmailAddress = admin.emailAddress;
        // configOverride.environment = "production";
        // process.env.NODE_ENV = "production";

        await this.reloadSails(configOverride);
        sails.log("Server lifted successfully.");

        let convert = new Convert();
        global.console.output.on("log", (...args) => {
            let timestamp = Date.now();
            let message = convert.toHtml(args.map((x) => (typeof x === "string" ? x : Purdy(x))).join(" "));
            sails.sockets.broadcast("log-application", "log", { timestamp, message });
            // TODO: Save to DB
        });

        return sails;
    }

};
