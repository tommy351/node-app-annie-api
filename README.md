# App Annie API

[![NPM version](https://badge.fury.io/js/app-annie-api.svg)](http://badge.fury.io/js/app-annie-api)

App Annie API for Node.js.

## Installation

``` bash
$ npm install app-annie-api 
```

## Usage

Create a new instance:

``` js
var AppAnnie = require('app-annie-api');

var annie = new AppAnnie({
    apiKey: '0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f'
});

var accounts = annie.accountList();

accounts.exec().then(function(data){
    console.log(data);
}).catch(function(error){
    console.log(error);
});
```

``` js
var AppAnnie = require('app-annie-api');

var annie = new AppAnnie({
    apiKey: '0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f'
});
var annie = new AppAnnie({
    apiKey: '0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f'
    accountId: '101010',
    market: 'app-market'
});

var apps = annie.accountProducts();

apps.exec().then(function(data){
    console.log(data);
}).catch(function(error){
    console.log(error);
});
```

``` js
var AppAnnie = require('app-annie-api');

var annie = new AppAnnie({
    apiKey: '0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f'
    accountId: '101010',
	productId: '10101010101010',
    market: 'app-market'
});

var oneDay = 24 * 60 * 60 * 1000;

var startDate = new Date();
startDate.setTime(startDate.getTime() - (oneDay * (currentDate.getDay() + 6)));

var endDate = new Date();
endDate.setTime(startDate.getTime() + (oneDay * 6));

annie.productSales().startDate(startDate).endDate(endDate).exec().then(function (data) {
    console.log(data);
}).catch(function (err) {
	console.log(err);
});
```


## API

### productList()

### productSales()

### productReviews()

### productRanks()

### productRatings()

### productFeatures()

### productDetails()

### accountList()

### accountSales()

### accountProducts()

### accountIaps()

### sharingProducts()

### Query.startDate(date)

**Alias:** start

### Query.endDate(date)

**Alias:** end

### Query.pageIndex(page)

**Alias:** page

### Query.currency(currency)

### Query.countries(countries)

### Query.breakDown(breakDown)

### Query.interval(interval)

### Query.feed(feed)

### Query.device(device)

### Query.version(version)

### Query.exec([callback])

## License

MIT