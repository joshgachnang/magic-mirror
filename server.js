"use strict";
var express = require('express');
var _ = require('underscore');

var config;
if (process.env.MAGIC_MIRROR_CONFIG) {
  config = require(process.env.MAGIC_MIRROR_CONFIG);
} else {
  config = require('./config.js');
}

var frontendConfigKeys = [];
var frontendScripts = [];
var frontendStyles = [];
var directives = [];

var app = express();

app.get('/', function (req, res) {
  "use strict";
  res.render("index.jade", {
    config: config,
    scripts: frontendScripts,
    stylesheets: frontendStyles
  });
});

// Init modules
for (let name of config.MODULES) {
  let mod = require(name);

  if (mod.init) {
    // If mod.init returns false, don't load the rest
    if (mod.init(config) === false) {
      console.log("Module returned false on init, skipping: ", name);
      continue;
    }
  }

  // Allow the module to add routes
  if (mod.routes) {
    app = mod.routes(app);
  }

  // Expose some of the config keys to the frontend
  if (mod.frontendConfig) {
    frontendConfigKeys = frontendConfigKeys.concat(mod.frontendConfig(config));
  }

  // Allow modules to add frontend scripts
  if (mod.scripts) {
    frontendScripts = frontendScripts.concat(mod.scripts);
  }

  // Allow modules to add frontend stylesheets
  if (mod.stylesheets) {
    frontendStyles = frontendStyles.concat(mod.stylesheets);
  }

  // Modules export Angular directives. Only allow those in the layout if the
  // module is initialize properly
  if (mod.directives) {
    directives = directives.concat(mod.directives);
  }
}

// Filter directives out of layout that aren't configured correctly
_.each(Object.keys(config.LAYOUT), function (key) {
  console.log('config lyaout key', key, config.LAYOUT[key])
  config.LAYOUT[key] = _.filter(config.LAYOUT[key], function (directive) {
    console.log("Filtering", directive, directives, directives.indexOf(directive))
    return directives.indexOf(directive) > -1
  });
  console.log('INTERMEDIATE LAYOUT', config.LAYOUT)
});

console.log('FINAL LAYOUT', config.LAYOUT);

app.get('/config.js', function (req, res) {
  "use strict";
  let base = 'angular.module("config", [])';
  frontendConfigKeys.forEach(function (key) {
    let val = config[key];
    console.log(key, val);
    base = base.concat(`.constant("${key}", "${val}")`);
  });
  res.header("Content-Type", "application/javascript");
  res.write(base);
  res.end();
});

// If it matches none of the above routes, check static files
app.use(express.static('.'));

app.listen(3000);
