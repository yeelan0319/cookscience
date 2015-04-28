
'use strict';

/* globals app, ajaxify, define, socket, templates */

define('forum/topic/events', [
	'forum/topic/browsing',
	'forum/topic/postTools',
	'forum/topic/threadTools',
	'forum/topic/posts',
	'components'
], function(browsing, postTools, threadTools, posts, components) {

	var Events = {};

	var events = {
		'event:user_enter': browsing.onUserEnter,
		'event:user_leave': browsing.onUserLeave,
		'event:user_status_change': browsing.onUserStatusChange,
		'event:voted': updatePostVotesAndUserReputation,
		'event:favourited': updateFavouriteCount,

		'event:topic_deleted': toggleTopicDeleteState,
		'event:topic_restored': toggleTopicDeleteState,
		'event:topic_purged': onTopicPurged,

		'event:topic_locked': threadTools.setLockedState,
		'event:topic_unlocked': threadTools.setLockedState,

		'event:topic_pinned': threadTools.setPinnedState,
		'event:topic_unpinned': threadTools.setPinnedState,

		'event:topic_moved': onTopicMoved,

		'event:post_edited': onPostEdited,
		'event:post_purged': onPostPurged,

		'event:post_deleted': togglePostDeleteState,
		'event:post_restored': togglePostDeleteState,

		'posts.favourite': togglePostFavourite,
		'posts.unfavourite': togglePostFavourite,

		'posts.upvote': togglePostVote,
		'posts.downvote': togglePostVote,
		'posts.unvote': togglePostVote,

		'event:new_notification': onNewNotification,
		'event:new_post': posts.onNewPost,

		'event:topic.notifyTyping': onNotifyTyping,
		'event:topic.stopNotifyTyping': onStopNotifyTyping
	};

	Events.init = function() {
		Events.removeListeners();
		for(var eventName in events) {
			if (events.hasOwnProperty(eventName)) {
				socket.on(eventName, events[eventName]);
			}
		}
	};

	Events.removeListeners = function() {
		for(var eventName in events) {
			if (events.hasOwnProperty(eventName)) {
				socket.removeListener(eventName, events[eventName]);
			}
		}
	};

	function updatePostVotesAndUserReputation(data) {
		var votes = components.get('post/vote-count', data.post.pid),
			reputationElements = $('.reputation[data-uid="' + data.post.uid + '"]');

		votes.html(data.post.votes).attr('data-votes', data.post.votes);
		reputationElements.html(data.user.reputation).attr('data-reputation', data.user.reputation);
	}

	function updateFavouriteCount(data) {
		$('[data-pid="' + data.post.pid + '"] .favouriteCount').html(data.post.reputation).attr('data-favourites', data.post.reputation);
	}

	function toggleTopicDeleteState(data) {
		threadTools.setLockedState(data);
		threadTools.setDeleteState(data);
	}

	function onTopicPurged(data) {
		ajaxify.go('category/' + ajaxify.variables.get('category_id'));
	}

	function onTopicMoved(data) {
		if (data && data.tid > 0) {
			ajaxify.go('topic/' + data.tid);
		}
	}

	function onPostEdited(data) {
		var editedPostEl = components.get('post/content', data.pid),
			editedPostHeader = components.get('post/header', data.pid);

		if (editedPostHeader.length) {
			editedPostHeader.fadeOut(250, function() {
				editedPostHeader.html(data.title).fadeIn(250);
			});
		}

		editedPostEl.fadeOut(250, function() {
			editedPostEl.filter('.post-purpose').html(data.content.purpose);
			editedPostEl.filter('.post-procedure').html(data.content.procedure);
			editedPostEl.filter('.post-reagents').html(data.content.reagents);
			editedPostEl.filter('.post-result').html(data.content.result);
			editedPostEl.filter('.post-reference').html(data.content.reference);
			editedPostEl.find('img').addClass('img-responsive');
			app.replaceSelfLinks(editedPostEl.find('a'));
			editedPostEl.fadeIn(250);

			$(window).trigger('action:posts.edited', data);
		});

		if (data.tags && tagsUpdated(data.tags)) {
			templates.parse('partials/post_bar', 'tags', {tags: data.tags}, function(html) {
				var tags = $('.tags');

				tags.fadeOut(250, function() {
					tags.html(html).fadeIn(250);
				});
			});
		}
	}

	function tagsUpdated(tags) {
		if (tags.length !== $('.tags').first().children().length) {
			return true;
		}

		for (var i=0; i<tags.length; ++i) {
			if (!$('.tags .tag-item[data-tag="' + tags[i].value + '"]').length) {
				return true;
			}
		}
		return false;
	}

	function onPostPurged(pid) {
		components.get('post', 'pid', pid).fadeOut(500, function() {
			$(this).remove();
		});

		postTools.updatePostCount();
	}

	function togglePostDeleteState(data) {
		var postEl = components.get('post', 'pid', data.pid);

		if (!postEl.length) {
			return;
		}

		postEl.toggleClass('deleted');
		var isDeleted = postEl.hasClass('deleted');
		postTools.toggle(data.pid, isDeleted);

		if (!app.user.isAdmin && parseInt(data.uid, 10) !== parseInt(app.user.uid, 10)) {
			if (isDeleted) {
				postEl.find('[component="post/content"]').translateHtml('[[topic:post_is_deleted]]');
			} else {
				postEl.find('[component="post/content"]').html(data.content);
			}
		}
	}

	function togglePostFavourite(data) {
		var favBtn = $('[data-pid="' + data.post.pid + '"] [component="post/favourite"]');

		if (!favBtn.length) {
			return;
		}

		favBtn.attr('data-favourited', data.isFavourited);

		favBtn.find('[component="post/favourite/on"]').toggleClass('hidden', !data.isFavourited);
		favBtn.find('[component="post/favourite/off"]').toggleClass('hidden', data.isFavourited);
	}

	function togglePostVote(data) {
		var post = $('[data-pid="' + data.post.pid + '"]');
		post.find('[component="post/upvote"]').toggleClass('upvoted', data.upvote);
		post.find('[component="post/downvote"]').toggleClass('downvoted', data.downvote);
	}

	function onNewNotification(data) {
		var tid = ajaxify.variables.get('topic_id');
		if (data && data.tid && parseInt(data.tid, 10) === parseInt(tid, 10)) {
			socket.emit('topics.markTopicNotificationsRead', tid);
		}
	}

	function onNotifyTyping(data) {
		var userEl = $('.thread_active_users [data-uid="' + data.uid + '"]');
		userEl.addClass('replying');

		var timeoutId = userEl.attr('timeoutId');
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = 0;
		}
		timeoutId = setTimeout(function() {
			userEl.removeClass('replying');
		}, 7000);
		userEl.attr('timeoutId', timeoutId);
	}

	function onStopNotifyTyping(data) {
		$('.thread_active_users [data-uid="' + data.uid + '"]').removeClass('replying');
	}

	return Events;

});
