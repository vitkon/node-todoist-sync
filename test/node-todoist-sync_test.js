/*global describe,it*/
'use strict';
var assert = require('assert'),
  nodeTodoistSync = require('../lib/node-todoist-sync.js');

describe('node-todoist-sync node module.', function() {
  it('can be instanciated', function() {
  	var client = new nodeTodoistSync({
  		email: 'test@user.com',
  		password: 'myStrongPassword'
  	});
    assert.equal( client.email, 'test@user.com');
    assert.equal( client.password, 'myStrongPassword');
    assert.equal( client.isLoggedIn, false);
  });
});
