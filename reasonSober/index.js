'use strict';

var request = require('request');

let config = {};
let reasons = [];

const updateReasonSober = function() {
  console.log('Updating reason sober');
  // var options = {
  //   url: config.TRIGGR_API_URL + '/reasonSober?status=approved',
  //   headers: {
  //     'X-Triggr-Internal': config.TRIGGR_API_KEY
  //   }
  // };
  // TODO: revert when https://github.com/triggr/triggr_api/pull/454 merges
  var options = {
    url: config.TRIGGR_API_URL + '/reasonSober',
    headers: {
      'X-Triggr-Internal': config.TRIGGR_API_KEY
    }
  };

  function callback(error, response, body) {
    console.log('reason sober CB', error, body);
    if (!error && response.statusCode == 200) {
      reasons = [];

      // TODO: remove when https://github.com/triggr/triggr_api/pull/454 merges
      let allReasons = JSON.parse(body);
      allReasons.forEach((reason) => {
        if (reason.status && reason.status == 'approved') {
          reasons.push(reason);
        }
      });

      console.log('Updated reason sober, found', reasons.length, 'reasons.');
    }
  }

  request(options, callback);
};

module.exports = {
  init: function(conf) {
    'use strict';
    config = conf;

    if (!config.TRIGGR_API_URL) {
      console.log('TRIGGR_API_URL config key missing, skipping reasonSober module');
      return false;
    }
    if (!config.TRIGGR_API_KEY) {
      console.log('TRIGGR_API_KEY config key missing, skipping reasonSober module');
      return false;
    }

    setInterval(updateReasonSober, 5 * 60 * 1000);
    updateReasonSober();
  },
  routes: function(app) {
    'use strict';
    app.get('/reasonSober', function(req, res) {
      res.send(reasons)
    });

    return app;
  },
  scripts: ['reasonSober/reasonSober.js'],
  directives: ['reason-sober'],
  stylesheets: ["reasonSober/reasonSober.css"]
};
