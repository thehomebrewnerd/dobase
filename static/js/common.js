

// stickyHeaders
var stickyHeaders = (function() {

	var $window = $(window),
			$stickies;

	var chechboxWrapper = $('.control-width.checkboxes-wrapper');

	var tPanelHeight = $('.tasks-panel').outerHeight(true);

	chechboxWrapper.css('padding-top', tPanelHeight + 'px')



	var load = function(stickies) {

		if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {

			$stickies = stickies.each(function() {

				var $thisSticky = $(this);

				$thisSticky
						.data('originalPosition', $thisSticky.offset().top)
						.data('originalHeight', $thisSticky.outerHeight(true))
						.parent()
						.height($thisSticky.outerHeight(true));


				var	$stickyPosition = $thisSticky.data('originalPosition');


				if (($stickyPosition - (tPanelHeight - 1)) <= $(document).scrollTop()) {

					$thisSticky.addClass("fixed");


				}else if (($stickyPosition - (tPanelHeight - 1)) >= $(document).scrollTop()) {
					$thisSticky.removeClass("fixed");
				}

			});


			$window.off("scroll.stickies").on("scroll.stickies", function () {
				_whenScrolling();
			});

		};

	}

	var _whenScrolling = function() {
		$stickies.each(function(i) {

			var $thisSticky = $(this),
					$stickyPosition = $thisSticky.data('originalPosition');


			if (($stickyPosition - (tPanelHeight - 1)) <= $window.scrollTop()) {

				// console.log($stickies);
				// $stickies.each(function (i) {
				// 	var $nextSticky = $stickies.eq(i + 1);
				// 	console.log($nextSticky);
				// })

				$thisSticky.addClass("fixed");

			} else if (($stickyPosition - (tPanelHeight - 1)) >= $window.scrollTop()) {
				$thisSticky.removeClass("fixed");
			}
		});
	};

	return {
		load: load
	};

})();

$(function() {
	stickyHeaders.load($(".followMeBar"));
});

var followMeBar = $('.followMeBar');
// $(window).scroll(function () {
//
// 	var positionFollowBar = followMeBar.offset().top;
// 	var window = $(document).scrollTop();
// 	console.log(followMeBar, positionFollowBar, window);
//
// })


$('a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
	e.target // newly activated tab
	e.relatedTarget // previous active tab

	if($(e.target).is('#personal-tab')) {
		// console.log('hello work');
		// $(window).scrollTop(-1);
		$('.followMeBar2').each(function () {
			$(this).removeClass("fixed");
			// $(this).data('originalPosition', $(this).offset().top)
		})
		stickyHeaders.load($(".followMeBar"));
		$('.followMeBar').each(function () {
			// $(this).data('originalPosition', $(this).offset().top)
			// console.log($(this).data('originalPosition'));
		})
	}
	else if($(e.target).is('#work-tab')) {
		// console.log('hello personal');
		// $(window).scrollTop(-1);

		$('.followMeBar').each(function () {
			$(this).removeClass("fixed");
			// $(this).data('originalPosition', $(this).offset().top)
		})
		stickyHeaders.load($(".followMeBar2"));
		$('.followMeBar2').each(function () {
			// $(this).data('originalPosition', $(this).offset().top)
			// console.log($(this).data('originalPosition'));
		})
	}

})

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(500).fadeOut("slow");

	// stickyHeaders.load($(".followMeBar"));

	var mainContainer = $('#main-container');
	var footer = $('.footer-menu');
	$('#side-bar-tabs a').on('click', function (event) {
		event.preventDefault();
		$(this).tab('show');
		var workTab = $('#hero-content-tabs a#work-tab');
		var personalTab = $('#hero-content-tabs a#personal-tab');
		if($(this).is('#work-tab')) {
			mainContainer.removeClass('black-theme');
			workTab.addClass('active');
			personalTab.removeClass('active');
		}
		else if($(this).is('#personal-tab')) {
			mainContainer.addClass('black-theme');
			personalTab.addClass('active');
			workTab.removeClass('active');
		}
	})
	$('#hero-content-tabs a').on('click', function (event) {
		event.preventDefault();
		$(this).tab('show');
		var workTab = $('#side-bar-tabs a#work-tab');
		var personalTab = $('#side-bar-tabs a#personal-tab');
		if($(this).is('#work-tab')) {
			mainContainer.removeClass('black-theme');
			footer.removeClass('black-theme');
			workTab.addClass('active');
			personalTab.removeClass('active');
		}
		else if($(this).is('#personal-tab')) {
			mainContainer.addClass('black-theme');
			footer.addClass('black-theme');
			personalTab.addClass('active');
			workTab.removeClass('active');
		}
	})



});

$(document).ready(function () {

	// archive task
	var archiveLink = $('.form-archive-link');

	archiveLink.on('click', function (e) {
		e.preventDefault();
		taskID = $(this).attr('data-id')
		archive_task(taskID, this);
	})

	// selects
	var formCheckInput = $('.form-check-input');

	var formBlockWrapper = ('.form-block-wrapper');
	var heroInputBlock = $(formBlockWrapper).find('.form-check-input.hero');

	function actionLine(item ,action) {
		var state = item;
		var formBlock;
		// console.log(state);
		formBlock = state.closest('.form-block');
		if(action === 'remove') {
			formBlock.removeClass('line-through');
		}else if (action === 'add') {
			formBlock.addClass('line-through');
		}
	}

	heroInputBlock.click('change', function(e) {
		var parent = $(this).closest('.form-block-wrapper');
		var firstLineParent = $(this).closest('.form-block-wrapper.first-line');
		var heroInputFirstLine = firstLineParent.find('.form-check-input.hero').eq(0);
		var secondLine = firstLineParent.find('.form-block-wrapper.second-line');
		var heroInputSecondLine = secondLine.find('.form-check-input.hero');
		var totalNotCheck = heroInputSecondLine.not(':checked').length;
		var totalCheck = heroInputSecondLine.length;
		var elementsInput = parent.find('.form-check-input');

		if(heroInputSecondLine.is(e.target)) {
			if(totalNotCheck === 0) {
				// console.log('not elements');
				// console.log(heroInputFirstLine);
				heroInputFirstLine.prop('checked', true);
			}
			else if(totalNotCheck < totalCheck) {
				heroInputFirstLine.prop('checked', false);
			}
		}
		if($(this).is(':checked')){
			elementsInput.each(function (index, item) {
				$(item).prop('checked', true);
				actionLine($(item), 'add');
			})
		}else {
			elementsInput.each(function (index, item) {
				$(item).prop('checked', false);
				actionLine($(item), 'remove');
			})
		}
	})

	formCheckInput.on('change', function () {
		var parentBlock = $(this).closest(formBlockWrapper);
		var firstLineParent = $(this).closest('.form-block-wrapper.first-line');
		var heroInputFirstLine = firstLineParent.find('.form-check-input.hero').eq(0);
		var secondLineParent = $(this).parents('.form-block-wrapper.second-line');
		var inputHeroSecondLine = secondLineParent.find('.form-check-input.hero');
		var allCheckSecondLine = firstLineParent.find('.form-check-input').not('.form-check-input.hero');

		var element = parentBlock.find(formCheckInput);
		var totalNotCheck = element.not(':checked').length;
		var totalCheck = element.length;

		var state = $(this);
		
		if($(this).is(':checked')){
			actionLine(state, 'add');
			complete_task(this.value, true);
			$(`.form-check-input[value="${this.value}"]`).prop('checked', true);
		}
		if(!$(this).is(':checked')){
			actionLine(state, 'remove');
			complete_task(this.value, false);
			$(`.form-check-input[value="${this.value}"]`).prop('checked', false);
		}

		var totalAllActiveCheck = allCheckSecondLine.not(':checked').length;

		if(totalNotCheck === 0) {
			// console.log('not elements');
			inputHeroSecondLine.prop('checked', true);
			actionLine(inputHeroSecondLine, 'add')
			if (totalAllActiveCheck === 0) {
				heroInputFirstLine.prop('checked', true);
				heroInputFirstLine.closest('.form-block').addClass('line-through');
				actionLine(heroInputFirstLine, 'add')
			}
		}else if (totalNotCheck < totalCheck || totalAllActiveCheck > 0) {
			inputHeroSecondLine.prop('checked', false);
			heroInputFirstLine.prop('checked', false);
			actionLine(inputHeroSecondLine, 'remove');
			actionLine(heroInputFirstLine, 'remove');
		}

	})


	// for change color theme


	var toggleButton = $('.toggle-input');
	var mainContainer = $('#main-container');
	var switchWork = $('#switch-work');
	var switchPersonal = $('#switch-personal');
	var taskPanelWork = $('.tasks-panel-work');
	var taskPanelPersonal = $('.tasks-panel-personal');
	var taskPanelPersonalTitle = taskPanelPersonal.find('.tasks-panel-title');
	var taskPanelWorkTitle = taskPanelWork.find('.tasks-panel-title');
	var wrapperTasksPanel = $('.hero-content .wrapper-tasks-panel');

	var mobileNavPersonal = $('.mobile-nav .personal');
	var mobileNavWork = $('.mobile-nav .work');


	var mobileTaskPanelWork = $('.footer-menu').find('.tasks-panel-work');
	var mobileTaskPanelPersonal = $('.footer-menu').find('.tasks-panel-personal');

	// console.log(mobileTaskPanelWork);

	var heroContentTasksPanelNavLink = wrapperTasksPanel.find('.nav-link');

	// console.log(heroContentTasksPanelNavLink);


	// console.log(wrapperTasksPanel);

	var toggleSync = $('.toggle-sync');

	var switcherTheme = true;

	toggleButton.click(function () {
		switcherTheme = !switcherTheme;
		// console.log(switcherTheme);

		if(switcherTheme === false) {
			changeThemeLight();

			toggleSync.prop('checked', true);


				var taskPanelWorkNavLink = taskPanelWork.find('.nav-link.active');

				var linkAttribute = taskPanelWorkNavLink.attr('id');

			// console.log(linkAttribute);
			//
			//
			// console.log(taskPanelWorkNavLink.attr('id') === 'me-tab');
			// console.log(linkAttribute === 'me-tab');
			// console.log(taskPanelWorkNavLink);

			// console.log(linkAttribute);
			// console.log($(window).outerWidth() < 900);

			var mobileTaskPanelWorkNavLink = mobileTaskPanelWork.find('.nav-link.active');

			var mobileLinkAttribute =	mobileTaskPanelWorkNavLink.attr('id');

			if($(window).outerWidth() < 900) {
				taskPanelWork.hide();
				taskPanelPersonal.removeClass('d-none');
				taskPanelPersonal.show();

				// console.log(mobileLinkAttribute);

				if(mobileLinkAttribute === 'me-tab-mobile') {
					$('[aria-labelledby=me-tab]').removeClass('active show');
					$('[aria-labelledby=me-tab-personal]').tab('show');
					$('[href=#me-personal]').addClass('active');
				}
				if(mobileLinkAttribute === 'others-tab-mobile') {
					$('[aria-labelledby=others-tab]').removeClass('active show');
					$('[aria-labelledby=others-tab-personal]').tab('show');
					$('[href=#others-personal]').addClass('active');
				}
				if(mobileLinkAttribute === 'new-tab-form') {
					$('[aria-labelledby=new-tab-form]').removeClass('active show');
					$('[aria-labelledby=new-tab-form-personal]').tab('show');
					$('[href=#new-form-personal]').addClass('active');
				}
				if(mobileLinkAttribute === 'date-tab-mobile') {
					$('[aria-labelledby=date-tab]').removeClass('active show');
					$('[aria-labelledby=date-tab-personal]').tab('show');
					$('[href=#date-personal]').addClass('active');
				}
				if(mobileLinkAttribute === 'archive-tab-mobile') {
					$('[aria-labelledby=archive-tab]').removeClass('active show');
					$('[aria-labelledby=archive-tab-personal]').tab('show');
					$('[href=#archive-personal]').addClass('active');
				}

				mobileTaskPanelWorkNavLink.removeClass('active');


			}
			if($(window).outerWidth() > 900) {

				if(linkAttribute === 'me-tab') {
					$('[aria-labelledby=me-tab]').removeClass('active show');
					$('[aria-labelledby=me-tab-personal]').tab('show');
					$('[href=#me-personal]').addClass('active');
				}
				if(linkAttribute === 'others-tab') {
					$('[aria-labelledby=others-tab]').removeClass('active show');
					$('[aria-labelledby=others-tab-personal]').tab('show');
					$('[href=#others-personal]').addClass('active');
				}
				if(linkAttribute === 'date-tab') {
					$('[aria-labelledby=date-tab]').removeClass('active show');
					$('[aria-labelledby=date-tab-personal]').tab('show');
					$('[href=#date-personal]').addClass('active');
				}
				if(linkAttribute === 'archive-tab') {
					$('[aria-labelledby=archive-tab]').removeClass('active show');
					$('[aria-labelledby=archive-tab-personal]').tab('show');
					$('[href=#archive-personal]').addClass('active');
				}

			}

			taskPanelWorkNavLink.removeClass('active');
			// console.log(tabPane.attr('aria-labelledby'));
			//
			// console.log(taskPanelWorkNavLink);

			mobileNavWork.removeClass('active');
			mobileNavPersonal.addClass('active');

		}
		if(switcherTheme === true) {
			changeThemeDark();

			toggleSync.prop('checked', false);

			var taskPanelPersonalNavLink = taskPanelPersonal.find('.nav-link.active');

			var linkAttributePersonal = taskPanelPersonalNavLink.attr('id');

			var mobileTaskPanelPersonalNavLink = mobileTaskPanelPersonal.find('.nav-link.active');

			var mobileLinkAttributePersonal =	mobileTaskPanelPersonalNavLink.attr('id');

			if($(window).outerWidth() < 900) {
				taskPanelWork.show();
				taskPanelPersonal.hide();

				if(mobileLinkAttributePersonal === 'me-tab-personal-mobile') {
					$('[aria-labelledby=me-tab-personal]').removeClass('active show');
					$('[aria-labelledby=me-tab]').tab('show');
					$('[href=#me]').addClass('active');
				}
				if(mobileLinkAttributePersonal === 'others-tab-personal-mobile') {
					$('[aria-labelledby=others-tab-personal]').removeClass('active show');
					$('[aria-labelledby=others-tab]').tab('show');
					$('[href=#others]').addClass('active');
				}
				if(mobileLinkAttributePersonal === 'new-tab-form-personal') {
					$('[aria-labelledby=new-tab-form-personal]').removeClass('active show');
					$('[aria-labelledby=new-tab-form]').tab('show');
					$('[href=#new-form]').addClass('active');
				}
				if(mobileLinkAttributePersonal === 'date-tab-personal-mobile') {
					$('[aria-labelledby=date-tab-personal]').removeClass('active show');
					$('[aria-labelledby=date-tab]').tab('show');
					$('[href=#date]').addClass('active');
				}
				if(mobileLinkAttributePersonal === 'archive-tab-personal-mobile') {
					$('[aria-labelledby=archive-tab-personal]').removeClass('active show');
					$('[aria-labelledby=archive-tab]').tab('show');
					$('[href=#archive]').addClass('active');
				}

				mobileTaskPanelPersonalNavLink.removeClass('active');

			}

			if($(window).outerWidth() > 900) {
				if(linkAttributePersonal === 'me-tab-personal') {
					$('[aria-labelledby=me-tab-personal]').removeClass('active show');
					$('[aria-labelledby=me-tab]').tab('show');
					$('[href=#me]').addClass('active');
				}
				if(linkAttributePersonal === 'others-tab-personal') {
					$('[aria-labelledby=others-tab-personal]').removeClass('active show');
					$('[aria-labelledby=others-tab]').tab('show');
					$('[href=#others]').addClass('active');
				}
				if(linkAttributePersonal === 'date-tab-personal') {
					$('[aria-labelledby=date-tab-personal]').removeClass('active show');
					$('[aria-labelledby=date-tab]').tab('show');
					$('[href=#date]').addClass('active');
				}
				if(linkAttributePersonal === 'archive-tab-personal') {
					$('[aria-labelledby=archive-tab-personal]').removeClass('active show');
					$('[aria-labelledby=archive-tab]').tab('show');
					$('[href=#archive]').addClass('active');
				}



			}

			taskPanelPersonalNavLink.removeClass('active');

			mobileNavPersonal.removeClass('active');
			mobileNavWork.addClass('active');

		}

		console.log(switcherTheme);
	});

	// if(toggleButton.is(':checked')) {
	// 	console.log(switcherTheme);
	// }

	heroContentTasksPanelNavLink.click(function () {
		// console.log('delete active class for others nav-link');

		heroContentTasksPanelNavLink.removeClass('active');
		var allTasksPanelTitles = wrapperTasksPanel.find('.tasks-panel-title');

		var tasksPanel = $(this).closest('.tasks-panel');
		var tasksPanelTitle = tasksPanel.find('.tasks-panel-title');
		allTasksPanelTitles.removeClass('active');
		tasksPanelTitle.addClass('active');
		// console.log(tasksPanelTitle);
		// console.log(tasksPanel);

	})

	$('.tasks-panel-work .nav-tabs').find('a').on('shown.bs.tab', function () {
		// console.log('hello');
		// console.log(taskPanelWork.find('.nav-link').hasClass('active'));
		changeThemeDark();
		toggleButton.prop('checked', false);
		switcherTheme = true;
	});
	$('.tasks-panel-personal .nav-tabs').find('a').on('shown.bs.tab', function () {
		// console.log('hello');
		// console.log(taskPanelWork.find('.nav-link').hasClass('active'));
		changeThemeLight();
		// console.log(toggleButton);
		toggleButton.prop('checked', true);
		switcherTheme = false;
	});


	function changeThemeLight() {

			switchWork.removeClass('active');
			switchPersonal.addClass('active');
			mainContainer.removeClass('dark-theme');
			mainContainer.addClass('light-theme');
			taskPanelWorkTitle.removeClass('active');
			taskPanelPersonalTitle.addClass('active');

			if($('.new-form-block').hasClass('active')) {
				console.log('new form has class');
				$('.mobile-nav').css('display', 'none');
			} else {
				$('.mobile-nav').css('display', 'flex');
			}

	}
	function changeThemeDark() {

			switchPersonal.removeClass('active');
			switchWork.addClass('active');
			mainContainer.removeClass('light-theme');
			mainContainer.addClass('dark-theme');
			taskPanelPersonalTitle.removeClass('active');
			taskPanelWorkTitle.addClass('active');

		if($('.new-form-block').hasClass('active')) {
			// console.log('new form has class');
			$('.mobile-nav').css('display', 'none');
		} else {
			$('.mobile-nav').css('display', 'flex');
		}

	}


	// settings for swiper

	if($(window).outerWidth() < 900) {
		var swiper = new Swiper('.swiper-container', {
			// Optional parameters
			direction: 'horizontal',
			initialSlide: 1,
			longSwipesMs: 300,
			longSwipesRatio: 0.1,
			observer: true,
			observeParents: true,
			speed: 1000,
			// autoHeight: true,
			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

		});

		// const swiperInit = document.querySelector('.swiper-container').swiper;

		toggleButton.click(function (e) {
			var swiper = new Swiper('.swiper-container', {
				// Optional parameters
				direction: 'horizontal',
				initialSlide: 1,
				longSwipesMs: 300,
				longSwipesRatio: 0.1,

			});


		})




	}



	// end setting for swiper

// Switch to personal tasks if it is the weekend or time is before 8am or after 5pm
date = new Date("September 24, 2021 20:30:00");
dayOfWeek = date.getDay()
hourOfDay = date.getHours()
var linkToClick = $('#me-tab-personal');
var mobileLink = $('#personal-mobile-toggle')

if (dayOfWeek == 0 || dayOfWeek == 6) {
	// console.log("Weekend - personal")
	linkToClick.click()
	mobileLink.click()
} else if (hourOfDay < 8 || hourOfDay > 17) {
	// console.log("early or late - personal")
	linkToClick.click()
	mobileLink.click()
} else {
	// console.log("Work")
}

})