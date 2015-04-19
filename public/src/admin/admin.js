"use strict";
/*global define, socket, app, ajaxify, utils, Mousetrap, Hammer, RELATIVE_PATH*/

(function() {
	$(document).ready(function() {
		setupMenu();
		setupKeybindings();

		if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			require(['admin/modules/search'], function(search) {
				search.init();
			});
		} else {
			activateMobile();
		}

		$(window).on('action:ajaxify.end', function(ev, data) {
			var url = data.url;

			selectMenuItem(data.url);
			setupHeaderMenu();
		});

		$(window).resize(setupHeaderMenu);
	});

	socket.emit('admin.config.get', function(err, config) {
		if(err) {
			return app.alert({
				alert_id: 'config_status',
				timeout: 2500,
				title: 'Error',
				message: 'NodeBB encountered a problem getting config: ' + err.message,
				type: 'danger'
			});
		}

		// move this to admin.config
		app.config = config;
	});

	function setupMenu() {
		var listElements = $('.sidebar-nav li');

		listElements.on('click', function() {
			var $this = $(this);

			if ($this.hasClass('nav-header')) {
				$this.parents('.sidebar-nav').toggleClass('open').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (ev) {
					$('.nano').nanoScroller();
				});
			} else {
				listElements.removeClass('active');
				$this.addClass('active');
			}
		});

		$('.nano').nanoScroller();

		$('#main-menu .nav-list > li a').append('<span class="pull-right"><i class="fa fa-inverse fa-arrow-circle-right"></i>&nbsp;</span>');
	}

	function setupKeybindings() {
		Mousetrap.bind('ctrl+shift+a r', function() {
			console.log('[admin] Reloading NodeBB...');
			socket.emit('admin.reload');
		});

		Mousetrap.bind('ctrl+shift+a R', function() {
			console.log('[admin] Restarting NodeBB...');
			socket.emit('admin.restart');
		});

		Mousetrap.bind('ctrl+shift+a d', function() {
			var tid = ajaxify.variables.get('topic_id'),
				cid = ajaxify.variables.get('category_id');

			if (tid && cid) {
				socket.emit('topics.delete', { tids: [tid], cid: cid });
			}
		});

		Mousetrap.bind('/', function(e) {
			$('#acp-search input').focus();

			return false;
		});
	}


	function activateMobile() {
		$('.admin').addClass('mobile');
		$('#main-menu').addClass('transitioning');

		Hammer(document.body).on('swiperight', function(e) {
			$('#main-menu').addClass('open');
		});

		Hammer(document.body).on('swipeleft', function(e) {
			$('#main-menu').removeClass('open');
		});

		Hammer($('#main-menu')[0]).on('swiperight', function(e) {
			$('#main-menu').addClass('open');
		});

		Hammer($('#main-menu')[0]).on('swipeleft', function(e) {
			$('#main-menu').removeClass('open');
		});

		$(window).on('scroll', function() {
			$('#main-menu').height($(window).height() + 20);
		});
	}

	function selectMenuItem(url) {
		url = url.replace(/\/\d+$/, '');

		$('#main-menu .nav-list > li').removeClass('active').each(function() {
			var menu = $(this),
				category = menu.parents('.sidebar-nav'),
				href = menu.children('a').attr('href');

			if (href && href.slice(1).indexOf(url) !== -1) {
				category.addClass('open');
				menu.addClass('active');
				modifyBreadcrumb(category.find('.nav-header').text(), menu.text());
				return false;
			}
		});
	}

	function modifyBreadcrumb() {
		var caret = ' <i class="fa fa-angle-right"></i> ';

		$('#breadcrumbs').html(caret + Array.prototype.slice.call(arguments).join(caret));
	}

	function setupHeaderMenu() {
		var env = utils.findBootstrapEnvironment();

		if (env !== 'lg') {
			if ($('.mobile-header').length || $('#content .col-lg-9').first().height() < 2000) {
				return;
			}

			($('#content .col-lg-3').first().clone().addClass('mobile-header'))
				.insertBefore($('#content .col-lg-9').first());
		} else {
			$('.mobile-header').remove();
		}
	}
}());