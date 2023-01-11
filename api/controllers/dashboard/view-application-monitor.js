module.exports = {


  friendlyName: 'View application monitor',


  description: 'Display "Application monitor" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/application-monitor'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
