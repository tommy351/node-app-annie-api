var Query = require('./query');

var apiBaseUrl = 'https://api.appannie.com/v1.2/';

var AppAnnie = module.exports = function(options){
  if (!options.apiKey) throw new Error('options.apiKey is required!');

  this.options = options;

  var _Query = this.Query = function(){
    Query.apply(this, arguments);
  };

  require('util').inherits(_Query, Query);

  _Query.prototype.options = options;
};

AppAnnie.prototype._accountUrl = function(){
  if (!this.options.accountId) throw new Error('options.accountId is required!');
  return apiBaseUrl + 'accounts/' + this.options.accountId + '/';
};

AppAnnie.prototype._appUrl = function(){
  if (!this.options.appId) throw new Error('options.appId is required!');
  return this._accountUrl() + 'apps/' + this.options.appId + '/';
};

AppAnnie.prototype.appList = function(){
  return new this.Query(this._accountUrl() + 'apps');
};

['Sales', 'Reviews'].forEach(function(i){
  AppAnnie.prototype['app' + i] = function(){
    return new this.Query(this._appUrl() + i.toLowerCase());
  };
});

['Ranks', 'Ratings', 'Features', 'Details'].forEach(function(i){
  AppAnnie.prototype['app' + i] = function(){
    if (!this.options.market) throw new Error('options.market is required!');
    if (!this.options.appId) throw new Error('options.appId is required!');
    return new this.Query(apiBaseUrl + 'apps/' + this.options.market + '/app/' + this.options.appId + '/' + i.toLowerCase());
  };
});

AppAnnie.prototype.accountList = function(){
  return new this.Query(apiBaseUrl + 'accounts');
};

['Sales', 'Apps', 'Iaps'].forEach(function(i){
  AppAnnie.prototype['account' + i] = function(){
    return new this.Query(this._accountUrl() + i.toLowerCase());
  };
});

AppAnnie.prototype.sharingApps = function(){
  return new this.Query(apiBaseUrl + 'sharing/apps');
};