var request = require('request'),
  Promise = require('bluebird'),
  util = require('./util');

var Query = module.exports = function(base){
  this.base = base;
};

Query.prototype.params = {};

Query.prototype.startDate = function(date){
  if (date == null) throw new Error('date is required!');

  this.params.start_date = util.formatDate(date);
  return this;
};

Query.prototype.start = Query.prototype.startDate;

Query.prototype.endDate = function(date){
  if (date == null) throw new Error('date is required!');

  this.params.end_date = util.formatDate(date);
  return this;
};

Query.prototype.end = Query.prototype.endDate;

Query.prototype.pageIndex = function(page){
  if (page == null) return;

  this.params.page_index = +page;
  return this;
};

Query.prototype.page = Query.prototype.pageIndex;

Query.prototype.currency = function(currency){
  if (currency == null) return;

  this.params.currency = currency;
  return this;
};

Query.prototype.countries = function(countries){
  if (countries == null) return;
  if (Array.isArray(countries)) countries = countries.join('+');

  this.params.countries = countries;
  return this;
};

Query.prototype.breakDown = function(breakDown){
  if (breakDown == null) return;

  this.params.break_down = breakDown;
  return this;
};

Query.prototype.interval = function(interval){
  if (interval == null) return;

  this.params.interval = interval;
  return this;
};

Query.prototype.feed = function(feed){
  if (feed == null) return;

  this.params.feed = feed;
  return this;
};

Query.prototype.device = function(device){
  if (device == null) return;

  this.params.device = device;
  return this;
};

Query.prototype.version = function(version){
  if (version == null) return;

  this.params.version = version;
  return this;
};

Query.prototype.exec = function(callback){
  var self = this;

  return new Promise(function(resolve, reject){
    request.get(self.base, {
      headers: {
        'Authorization': 'Bearer ' + self.options.apiKey,
        'Content-Type': 'application/json'
      },
      qs: self.params
    }, function(err, res, body){
      if (err) return reject(err);

      var data = JSON.parse(body);
      if (res.statusCode !== 200) return reject(util.formatError(data));

      resolve(data);
    });
  }).nodeify(callback);
};