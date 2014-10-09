/*
 * 
 * https://github.com/vitkon/node-todoist-sync
 *
 * Copyright (c) 2014 Vitaly Kondratiev
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request'),
	qs = require('querystring'),
	cheerio = require('cheerio'),
	q = require('q'),
	baseUrl = 'https://todoist.com',
	util = require('util');


var Todoist = function (params) {

	if (!params.email || !params.password) {
		util.error('Please provide credentials');
	}

	this.email = params.email;
	this.password = params.password;
	this.oauth_token = params.oauth_token;
	this.isLoggedIn = false;
	this.seq_no = params.seq_no || 0;

};


Todoist.prototype._request = function (params) {
	var result = q.defer(),
		path = baseUrl + params.url + '?' + qs.stringify(params.data || ''),
		type = params.type || 'get';

	request[type](path, function (err, resp, body) {
		if (err) {
			result.reject(err);
			//throw new Error(err);
		} else if (params.json) {
			try{
				result.resolve(JSON.parse(body));
			} catch (er) {
				// todoist sends back error response as html
				// won't parse properly but there's not sense in passing that error
				var $ = cheerio.load(body);
				try{
					var temp = $('p').text();
					result.resolve(temp);
				} catch (e) {
					result.resolve(body);
				}
			}
		} else {
			// send it back as object so that way caller always gets objects
			result.resolve({ response: body });
		}
		return;
	});
	return result.promise;
};

Todoist.prototype._login = function () {
	var result = q.defer(),
		self = this;

	var request = this._request({
		url:'/API/login',
		data: {email: this.email, password: this.password},
		type: 'get',
		json: true
	});

	//TODO: catch error when there's no connection

	request.then(function (data) {

		if (data === 'LOGIN_ERROR') {
			throw new Error('Incorrect credentials');
		}
		self.isLoggedIn = (data.api_token !== undefined);
		self.api_token = data.api_token;
		result.resolve();
	}, function (error) {
		result.reject(error);
	});

	return result.promise;
};

Todoist.prototype._fetch = function () {
	var result = q.defer(),
		self = this;

	this._request({
		url:'/TodoistSync/v5.3/get',
		data: {api_token: self.api_token, seq_no: self.seq_no},
		type: 'post'
	}).then(function (data) {
		self.seq_no = data.seq_no;
		result.resolve(data);
	}, function (error) {
		result.reject(error);
	});

	return result.promise;
};


Todoist.prototype.fetchData = function () {
	var self = this,
		result = q.defer();

	if (!this.isLoggedIn) {
		this._login().then(function () {
			self._fetch().then(function (response) {
				result.resolve(response)
			});
		}, function (error) {
			util.error('Unable to login to Todoist');
			return result.reject(error);
		});
	} else {
		self._fetch().then(function (response) {
			result.resolve(response)
		});
	}

	return result.promise;

};


exports = module.exports = Todoist;
