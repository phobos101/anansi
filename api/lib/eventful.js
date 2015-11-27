var async = require('async');
var Event = require('../models/event');
var request = require('request');
var config = require('../config/config');
var mongoose  = require("mongoose");

mongoose.connect(config.database);

var token = process.env.EVENTFUL_API_KEY;
var baseUrl = "http://api.eventful.com/json/events/search?keywords=";
var keyword = "hackathon";
var fetchUrls = [];

var url = baseUrl + keyword + "&l=United+Kingdom&app_key=" + token + "&page_number=";

request(url, function (err, res, body) {
  if (err) return console.log(err);
  if (res.statusCode == 200) {
    var data = JSON.parse(body);
    var pageCount = data.page_count;
    for (var i = 0; i < pageCount; i++) {
      var finalUrl = task.url + i;
      console.log('[+] Pushing URL: ' + finalUrl);
      fetchUrls.push(finalUrl);
    };
  };
});

setTimeout(populateDB, 10000);
function populateDB() {
  console.log('*****************************************************');
  console.log('[+] URLs populated. Fetching events from each page...');
  console.log('*****************************************************');
  var q = async.queue(function (task, done) {
    request(task.url, function(err, res, body) {
      if (err) return console.log(err);
      if (res.statusCode == 200) {
        var data = JSON.parse(body)
        var events = data.events.event;
        for (n in events) {
          var newEvent = new Event();
          newEvent.title = events[n].title;
          newEvent.city = events[n].city_name;
          newEvent.description = events[n].description;
          newEvent.location = (events[n].venue_address + ", " + events[n].city_name);
          newEvent.date = events[n].start_time;
          try {
            newEvent.image = events[n].image.medium.url;
          }
          catch(err) {
            newEvent.image = 'http://www.fillmurray.com/200/200';
          };

          newEvent.save(function (err, event) {
            if (err) return console.log(err);
            console.log('[+] ' + newEvent.title + 'added to DB');
          });
        };
      };
    });
  }, fetchUrls.length);

  for (var k = 0; k < fetchUrls.length; k++) {
    q.push({ url: fetchUrls[k]});
  };
};
