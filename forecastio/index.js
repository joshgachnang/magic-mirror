module.exports = {
  init: function (conf) {
    "use strict";
    if (!conf.LATITUDE ||
        !conf.LONGITUDE ||
        !conf.FORECASTIO_KEY) {
      console.log("Missing Forecast.io config keys, skipping");
      return false;
    }
  },
  frontendConfig: function (config) {
    "use strict";
    // Config keys required to run the Forecast.io frontend widget
    return [
      "LATITUDE",
      "LONGITUDE",
      "FORECASTIO_KEY"
    ];
  },
  scripts: ["forecastio/forecastio.js"],
  stylesheets: ["forecastio/forecast.css"],
  directives: ["forecastio-simple"]
};
