/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"updatePlugin":{"verb":"PATCH","url":"/api/v1/plugin","args":["name"]},"removePlugin":{"verb":"DELETE","url":"/api/v1/plugin","args":["name"]},"changeSettings":{"verb":"PUT","url":"/api/v1/plugin/change-settings","args":["id","settings"]},"addInstance":{"verb":"PUT","url":"/api/v1/plugin/add-instance","args":["name","pluginName","settings"]},"saveTask":{"verb":"PUT","url":"/api/v1/plugin/save-task","args":["id","settings"]},"updateConfig":{"verb":"PUT","url":"/api/v1/dashboard/update-config","args":["id","baseUrl","port","datastoreAdapter","datastoreUrl"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updateApikey":{"verb":"PUT","url":"/api/v1/account/update-apikey","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["name","emailAddress"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","name"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"observeMySession":{"verb":"POST","url":"/api/v1/sockets/observe-my-session","args":[],"protocol":"io.socket"},"logger":{"verb":"POST","url":"/api/v1/sockets/logger","args":["roomName"],"protocol":"io.socket"}}
  /* eslint-enable */

});
