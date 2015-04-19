'use strict';

var winston = require('winston'),
	validator = require('validator'),
	user = require('../user'),
	translator = require('../../public/src/modules/translator');

module.exports = function(Meta) {
	Meta.title = {};

	var tests = {
		isCategory: /^category\/\d+\/?/,
		isTopic: /^topic\/\d+\/?/,
		isTag: /^tags\/[\s\S]+\/?/,
		isUserPage: /^user\/[^\/]+(\/[\w]+)?/
	};

	Meta.title.build = function (urlFragment, language, locals, callback) {
		var uri = '';
		var fallbackTitle = validator.escape(Meta.config.browserTitle || Meta.config.title || 'NodeBB');
		try {
			uri = decodeURIComponent(urlFragment);
		} catch(e) {
			winston.error('Invalid url fragment : ' + urlFragment, e.stack);
			return callback(null, fallbackTitle);
		}

		Meta.title.parseFragment(uri, language, locals, function(err, title) {
			if (err) {
				title = fallbackTitle;
			} else {
				if (title) {
					title = validator.escape(title);
				}
				title = (title ? title + ' | ' : '') + fallbackTitle;
			}

			callback(null, title);
		});
	};

	Meta.title.parseFragment = function (urlFragment, language, locals, callback) {
		var	translated = ['', 'recent', 'unread', 'users', 'notifications', 'popular', 'tags'];
		if (translated.indexOf(urlFragment) !== -1) {
			if (!urlFragment.length) {
				urlFragment = 'home';
			}

			translator.translate('[[pages:' + urlFragment + ']]', language, function(translated) {
				callback(null, translated);
			});
		} else if (tests.isCategory.test(urlFragment)) {
			var cid = urlFragment.match(/category\/(\d+)/)[1];

			require('../categories').getCategoryField(cid, 'name', callback);
		} else if (tests.isTopic.test(urlFragment)) {
			var tid = urlFragment.match(/topic\/(\d+)/)[1];

			require('../topics').getTopicField(tid, 'title', callback);
		} else if (tests.isTag.test(urlFragment)) {
			var tag = urlFragment.match(/tags\/([\s\S]+)/)[1];

			translator.translate('[[pages:tag, ' + tag + ']]', language, function(translated) {
				callback(null, translated);
			});
		} else if (tests.isUserPage.test(urlFragment)) {
			var	matches = urlFragment.match(/user\/([^\/]+)\/?([\w]+)?/),
				userslug = matches[1],
				subpage = matches[2];

			user.getUsernameByUserslug(userslug, function(err, username) {
				if (err) {
					return callback(err);
				}

				if (!username) {
					username = '[[error:no-user]]';
				}

				if (!subpage) {
					return callback(null, username);
				}

				translator.translate('[[pages:user.' + subpage + ', ' + username + ']]', language, function(translated) {
					callback(null, translated);
				});
			});
		} else {
			callback(null);
		}
	};
};