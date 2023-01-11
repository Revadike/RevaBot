/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
    "GET /":                                   { "action": "view-homepage-or-redirect" },
    "GET /welcome/:unused?":                   { "action": "dashboard/view-welcome" },
    "GET /plugin/:plugin":                     { "action": "dashboard/view-plugin" },
    "GET /plugin/:plugin/new":                 { "action": "dashboard/view-new-instance" },
    "GET /plugin/:plugin/monitor":             { "action": "dashboard/view-plugin-monitor" },
    "GET /plugin/:plugin/settings":            { "action": "dashboard/view-plugin-settings" },
    "GET /plugin/:plugin/scheduler":           { "action": "dashboard/view-plugin-scheduler" },
    "GET /plugin/:plugin/task/new":            { "action": "dashboard/view-edit-task" },
    "GET /plugin/:plugin/task/edit/:taskid":   { "action": "dashboard/view-edit-task" },
    "    /plugin/:plugin/task/remove/:taskid": { "action": "plugin/remove-task" },
    "GET /application/settings":               { "action": "dashboard/view-edit-application" },
    "GET /application/monitor":                { "action": "dashboard/view-application-monitor" },

    "GET /faq": { "action": "view-faq" },

    "GET /signup":          { "action": "entrance/view-signup" },
    "GET /email/confirm":   { "action": "entrance/confirm-email" },
    "GET /email/confirmed": { "action": "entrance/view-confirmed-email" },

    "GET /login":           { "action": "entrance/view-login" },
    "GET /password/forgot": { "action": "entrance/view-forgot-password" },
    "GET /password/new":    { "action": "entrance/view-new-password" },

    "GET /account":          { "action": "account/view-account-overview" },
    "GET /account/password": { "action": "account/view-edit-password" },
    "GET /account/profile":  { "action": "account/view-edit-profile" },

    //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
    //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
    //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
    "/logout": "/api/v1/account/logout",

    //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
    //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
    //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
    // …

    //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
    //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
    //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
    // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
    // from the Parasails library, or by using those method names as the `action` in <ajax-form>.

    "PATCH   /api/v1/plugin":                  { "action": "plugin/update-plugin" },
    "DELETE  /api/v1/plugin":                  { "action": "plugin/remove-plugin" },
    "PUT     /api/v1/plugin/change-settings":  { "action": "plugin/change-settings" },
    "PUT     /api/v1/plugin/add-instance":     { "action": "plugin/add-instance" },
    "PUT     /api/v1/plugin/save-task":        { "action": "plugin/save-task" },
    "PUT     /api/v1/dashboard/update-config": { "action": "dashboard/update-config" },

    "/api/v1/account/logout":                              { "action": "account/logout" },
    "PUT   /api/v1/account/update-apikey":                 { "action": "account/update-apikey" },
    "PUT   /api/v1/account/update-password":               { "action": "account/update-password" },
    "PUT   /api/v1/account/update-profile":                { "action": "account/update-profile" },
    "PUT   /api/v1/entrance/login":                        { "action": "entrance/login" },
    "POST  /api/v1/entrance/signup":                       { "action": "entrance/signup" },
    "POST  /api/v1/entrance/send-password-recovery-email": { "action": "entrance/send-password-recovery-email" },
    "POST  /api/v1/entrance/update-password-and-login":    { "action": "entrance/update-password-and-login" },
    "POST  /api/v1/sockets/observe-my-session":            { "action": "sockets/observe-my-session", "hasSocketFeatures": true },
    "POST /api/v1/sockets/logger":                         { "action": "sockets/logger", "hasSocketFeatures": true },

};
