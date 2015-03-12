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
  apiKey: '',
  accountId: '',
  appId: '',
  market: ''
});
```

Functions exposed by the module return a query.  Call exec() on it to execute the query.

``` js
annie.appReviews().exec(function(error,result) {
	console.log(result);
});

```

## API

### appList()

### appSales()

### appReviews()

### appRanks()

### appRatings()

### appFeatures()

### appDetails()

### accountList()

### accountSales()

### accountApps()

### accountIaps()

### sharingApps()

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
