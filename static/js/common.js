

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

				console.log($thisSticky);

				$thisSticky
						.data('originalPosition', $thisSticky.offset().top)
						.data('originalHeight', $thisSticky.outerHeight(true))
						.parent()
						.height($thisSticky.outerHeight(true));


				var	$stickyPosition = $thisSticky.data('originalPosition');

				console.log($stickyPosition);
				console.log($window.scrollTop());

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

			// console.log($stickyPosition);
			// console.log($window.scrollTop());

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
	console.log($(e.target).is('#work-tab'));
	if($(e.target).is('#personal-tab')) {
		console.log('hello work');
		// $(window).scrollTop(-1);
		$('.followMeBar2').each(function () {
			$(this).removeClass("fixed");
			// $(this).data('originalPosition', $(this).offset().top)
		})
		stickyHeaders.load($(".followMeBar"));
		$('.followMeBar').each(function () {
			// $(this).data('originalPosition', $(this).offset().top)
			console.log($(this).data('originalPosition'));
		})
	}
	else if($(e.target).is('#work-tab')) {
		console.log('hello personal');
		// $(window).scrollTop(-1);

		$('.followMeBar').each(function () {
			$(this).removeClass("fixed");
			// $(this).data('originalPosition', $(this).offset().top)
		})
		stickyHeaders.load($(".followMeBar2"));
		$('.followMeBar2').each(function () {
			// $(this).data('originalPosition', $(this).offset().top)
			console.log($(this).data('originalPosition'));
		})
	}

})

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

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

	// selects
	var formCheckInput = $('.form-check-input');

	var formBlockWrapper = ('.form-block-wrapper');
	var heroInputBlock = $(formBlockWrapper).find('.form-check-input.hero');

	function actionLine(item ,action) {
		var state = item;
		var formBlock;
		console.log(state);
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
				console.log('not elements');
				console.log(heroInputFirstLine);
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
		}
		if(!$(this).is(':checked')){
			actionLine(state, 'remove');
		}

		var totalAllActiveCheck = allCheckSecondLine.not(':checked').length;

		if(totalNotCheck === 0) {
			console.log('not elements');
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


})