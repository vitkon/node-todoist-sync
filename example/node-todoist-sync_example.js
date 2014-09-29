'use strict';

var nodeTodoistSync = require('../lib/node-todoist-sync.js');

var client = new nodeTodoistSync({
	email: 'test@user.com',
	password: '123qwe',
	seq_no: 2233960073
});

client.fetchData();