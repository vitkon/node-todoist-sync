/*global describe,it*/
'use strict';
var assert = require('assert'),
  nodeTodoistSync = require('../lib/node-todoist-sync.js');

describe('node-todoist-sync node module.', function() {
  it('must be awesome', function() {
    assert( nodeTodoistSync.awesome(), 'awesome');
  });
});
