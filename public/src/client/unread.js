'use strict';

/* globals define, app, socket */

define('forum/unread', ['forum/recent', 'topicSelect', 'forum/infinitescroll', 'components'], function(recent, topicSelect, infinitescroll, components) {
	var Unread = {};

	$(window).on('action:ajaxify.start', function(ev, data) {
		if (ajaxify.currentPage !== data.url) {
			recent.removeListeners();
		}
	});

	Unread.init = function() {
		app.enterRoom('recent_posts');

		$('#new-topics-alert').on('click', function() {
			$(this).addClass('hide');
		});

		recent.watchForNewPosts();

		$('#markSelectedRead').on('click', function() {
			var tids = topicSelect.getSelectedTids();
			if(!tids.length) {
				return;
			}
			socket.emit('topics.markAsRead', tids, function(err) {
				if(err) {
					return app.alertError(err.message);
				}

				doneRemovingTids(tids);
			});
		});

		$('#markAllRead').on('click', function() {
			socket.emit('topics.markAllRead', function(err) {
				if(err) {
					return app.alertError(err.message);
				}

				app.alertSuccess('[[unread:topics_marked_as_read.success]]');

				$('[component="category"]').empty();
				$('#category-no-topics').removeClass('hidden');
				$('.markread').addClass('hidden');
			});
		});

		$('.markread').on('click', '.category', function() {
			function getCategoryTids(cid) {
				var tids = [];
				components.get('category/topic', 'cid', cid).each(function() {
					tids.push($(this).attr('data-tid'));
				});
				return tids;
			}
			var cid = $(this).attr('data-cid');
			var tids = getCategoryTids(cid);

			socket.emit('topics.markCategoryTopicsRead', cid, function(err) {
				if(err) {
					return app.alertError(err.message);
				}

				doneRemovingTids(tids);
			});
		});

		socket.emit('categories.get', onCategoriesLoaded);

		topicSelect.init();

		if ($("body").height() <= $(window).height() && $('[component="category"]').children().length >= 20) {
			$('#load-more-btn').show();
		}

		$('#load-more-btn').on('click', function() {
			loadMoreTopics();
		});

		infinitescroll.init(loadMoreTopics);

		function loadMoreTopics(direction) {
			if(direction < 0 || !$('[component="category"]').length) {
				return;
			}

			infinitescroll.loadMore('topics.loadMoreUnreadTopics', {
				after: $('[component="category"]').attr('data-nextstart')
			}, function(data, done) {
				if (data.topics && data.topics.length) {
					recent.onTopicsLoaded('unread', data.topics, true, done);
					$('[component="category"]').attr('data-nextstart', data.nextStart);
				} else {
					done();
					$('#load-more-btn').hide();
				}
			});
		}
	};

	function doneRemovingTids(tids) {
		removeTids(tids);

		app.alertSuccess('[[unread:topics_marked_as_read.success]]');

		if (!$('[component="category"]').children().length) {
			$('#category-no-topics').removeClass('hidden');
			$('.markread').addClass('hidden');
		}
	}

	function removeTids(tids) {
		for(var i=0; i<tids.length; ++i) {
			components.get('category/topic', 'tid', tids[i]).remove();
		}
	}

	function onCategoriesLoaded(err, categories) {
		createCategoryLinks(categories);
	}

	function createCategoryLinks(categories) {
		for (var i=0; i<categories.length; ++i) {
			createCategoryLink(categories[i]);
		}
	}

	function createCategoryLink(category) {
		var link = $('<a role="menuitem" href="#"></a>');

		if (category.icon) {
			link.append('<i class="fa fa-fw ' + category.icon + '"></i> ' + category.name);
		} else {
			link.append(category.name);
		}

		$('<li role="presentation" class="category" data-cid="' + category.cid + '"></li>')
			.append(link)
			.appendTo($('.markread .dropdown-menu'));
	}

	return Unread;
});
