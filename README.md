#  [![Build Status](https://secure.travis-ci.org/vitkon/node-todoist-sync.png?branch=master)](http://travis-ci.org/vitkon/node-todoist-sync)

> Todoist sync API for Node


## Getting Started

Install the module with: `npm install node-todoist-sync`

```js
var nodeTodoistSync = require('../lib/node-todoist-sync.js');

var client = new nodeTodoistSync({
	email: 'your@email.com',
	password: 'YourPassword',
	seq_no: 0 // seq_no=0 for initial sync
});

// fetch all data from Todoist
client.fetchData().then(function (response) {
	console.log(response);
});
```


## Documentation

_(Coming soon)_


## Examples

_(Coming soon)_


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Vitaly Kondratiev  
Licensed under the MIT license.
