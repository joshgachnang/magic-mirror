var config = {};

module.exports = {
  init: function (conf) {
    "use strict";
    config = conf;
  },
  scripts: ["stayFresh/stayFresh.js"],
  directives: ["stay-fresh"],
  stylesheets: ["stayFresh/stayFresh.css"]
};
