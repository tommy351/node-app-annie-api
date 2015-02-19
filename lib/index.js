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

AppAnnie.prototype._productUrl = function(){
  if (!this.options.productId) throw new Error('options.productId is required!');
  return this._accountUrl() + 'products/' + this.options.productId + '/';
};

AppAnnie.prototype.productList = function(){
  return new this.Query(this._accountUrl() + 'products');
};

['Sales', 'Reviews'].forEach(function(i){
  AppAnnie.prototype['product' + i] = function(){
    return new this.Query(this._productUrl() + i.toLowerCase());
  };
});

['Ranks', 'Ratings', 'Features', 'Details'].forEach(function(i){
  AppAnnie.prototype['product' + i] = function(){
    if (!this.options.market) throw new Error('options.market is required!');
    if (!this.options.productId) throw new Error('options.productId is required!');
    return new this.Query(apiBaseUrl + 'products/' + this.options.market + '/product/' + this.options.productId + '/' + i.toLowerCase());
  };
});

AppAnnie.prototype.accountList = function(){
  return new this.Query(apiBaseUrl + 'accounts');
};

['Sales', 'Products', 'Iaps'].forEach(function(i){
  AppAnnie.prototype['account' + i] = function(){
    return new this.Query(this._accountUrl() + i.toLowerCase());
  };
});

AppAnnie.prototype.sharingProducts = function(){
  return new this.Query(apiBaseUrl + 'sharing/products');
};