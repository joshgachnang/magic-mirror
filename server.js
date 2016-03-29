var express = require('express');
var cta = require("./cta-node");
var Uber = require('node-uber');

var calendar = require('./components/googleCalendar/googleCalendar');

var config;
if (process.env.MAGIC_MIRROR_CONFIG) {
  config = require(process.env.MAGIC_MIRROR_CONFIG);
} else {
  config = require('./config.js');
}

var uber = new Uber({
  client_id: config.UBER_CLIENT_ID,
  client_secret: config.UBER_CLIENT_SECRET,
  server_token: config.UBER_SERVER_TOKEN,
  name: config.UBER_APP_NAME
});

var app = express();

var uberEstimate = {};

function updateUberEstimate() {
  // TODO: support oauth, use this to get surge
  uber.estimates.time({
    start_latitude: config.LATITUDE, start_longitude: config.LONGITUDE
  }, function (err, res) {
    if (err) {
      console.error(err);
    } else {
      //console.log(res);
      uberEstimate = res;
    }
  });
}

setInterval(updateUberEstimate, 5 * 60 * 1000);
updateUberEstimate();

cta.init({trainApiKey: config.CTA_TRAIN_API_KEY});

var trainArrivals = [];

function updateTrainSchedule() {
  trainArrivals = [];
  var sched = cta.train.arrivals.byMapId(config.CTA_TRAIN_MAP_ID);
  sched.then(function (res) {
    for (schedule of res) {
      trainArrivals.push(cta.train.arrivals.toETA(schedule));
    }
    console.log("Updating CTA schedule");
  });

}

setInterval(updateTrainSchedule, 60 * 1000);
updateTrainSchedule();

app.get('/', function (req, res) {
  "use strict";
  res.render("index.jade", {config: config});
});

app.get('/config.js', function (req, res) {
  "use strict";
  let base = 'angular.module("config", [])';
  [
    "LATITUDE",
    "LONGITUDE",
    "FORECASTIO_KEY"
  ].forEach(function (key) {
    let val = config[key];
    console.log(key, val);
    base = base.concat(`.constant("${key}", "${val}")`);
  });
  res.header("Content-Type", "application/javascript");
  res.write(base);
  res.end();
});

app.get('/uber', function (req, res) {
  res.json(uberEstimate);
});

app.get('/calendars', function (req, res) {
  res.json(calendar.calendars);
});

app.get('/ctaArrivals', function (req, res) {
  res.json(trainArrivals);
});

app.get('/register/uber', function (req, res) {
  res.send(uber.getAuthorizeUrl(['request']));
});

app.get('/quotes', function (req, res) {
  res.send(config.QUOTES)
});

// If it matches none of the above routes, check static files
app.use(express.static('.'));

app.listen(3000);
