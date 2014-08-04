var Query = require('./query');

var apiBaseUrl = 'https://api.appannie.com/v1/';

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

AppAnnie.prototype.app = {
  list: function(){
    return new this.Query(this._accountUrl() + 'apps');
  }
};

['sales', 'reviews'].forEach(function(i){
  AppAnnie.prototype.app[i] = function(){
    return new this.Query(this._appUrl() + i);
  };
});

['ranks', 'ratings', 'features', 'details'].forEach(function(i){
  AppAnnie.prototype.app[i] = function(){
    if (!this.options.market) throw new Error('options.market is required!');
    if (!this.options.appId) throw new Error('options.appId is required!');
    return new this.Query('https://api.appannie.com/v1.1/apps/' + this.options.market + '/app/' + this.options.appId + '/' + i);
  };
});

AppAnnie.prototype.account = {
  list: function(){
    return new this.Query(apiBaseUrl + 'accounts');
  }
};

['sales', 'apps', 'iaps'].forEach(function(i){
  AppAnnie.prototype.account[i] = function(){
    return new this.Query(this._accountUrl() + i);
  };
});

AppAnnie.prototype.sharing = {
  apps: function(){
    return new this.Query(apiBaseUrl + 'sharing/apps');
  }
};