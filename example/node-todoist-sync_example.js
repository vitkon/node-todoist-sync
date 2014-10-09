'use strict';

var nodeTodoistSync = require('../lib/node-todoist-sync.js');
var q = require('q');

//console.log(nodeTodoistSync);

var client = new nodeTodoistSync({
	email: 'test@gmail.com',
	password: '123qwe',
	seq_no: 0
});


//var a = client.fetchData();

//console.log(a);

client.fetchData().then(function (response) {
	console.log(response);
});