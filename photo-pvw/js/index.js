var award = {},
	mySwiper = null;

$(function($) {
	award.allWorks();
	mySwiper = new Swiper('.swiper-container', {
		observer: true,
		observeParents: true
	});
})

award = {
	allWorks: function() {
		$.ajax({
			type: 'get',
			url: "json/works.json",
			success: function(res) {
				$(".all-works-box").empty();
				var awardFrag = document.createDocumentFragment(),
					noMargin = "";

				award.promptDataInit(res);

				$.each(res, function(index, item) {
					if((index + 1) % 3 == 0) {
						noMargin = "no-margin";
					} else {
						noMargin = "";
					}
					$(awardFrag).append('<li class="all-works-li ' + noMargin + '"> <div><img class="lazyload work" data-id="' + item.id + '" data-src = "' + item.imgSrc + '"></div> <p class = "user-name"> ' + item.username + ' </p></li>');
				})
				$(".all-works-box").append($(awardFrag));

				award.clickPicPromptShow();
			}
		})
	},
	clickPicPromptShow: function() {
		//		点击图片弹大图
		$(".all-works-li div").height($(".all-works-li").width());
		$(".work").each(function() {
			var _this = this;
			award.tap($(this)[0], function() {
				var id = parseInt($(_this).attr("data-id")) - 1;
				mySwiper.slideTo(id);
				$(".prompt-bg").removeClass("hide");
			})
		})
	},
	promptDataInit: function(promptInfo) {
		//		弹窗大图初始化
		$(".swiper-wrapper").empty();
		var promptFrag = document.createDocumentFragment();
		$.each(promptInfo, function(index, item) {
			$(promptFrag).append('<div class="swiper-slide"><img class="main-pic lazyload" data-src="' + item.imgSrc + '"></div>');
		})
		$(".swiper-wrapper").append($(promptFrag));
	},
	tap: function(node, callback, scope) {
		node.addEventListener("touchstart", function(e) {
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
		});
		node.addEventListener("touchend", function(e) {
			e.stopPropagation();
			var curx = e.changedTouches[0].pageX;
			var cury = e.changedTouches[0].pageY;
			if(Math.abs(curx - x) < 6 && Math.abs(cury - y) < 6) {
				callback.apply(scope, arguments);
			}
		});
	}
}

$(".prompt-bg").each(function() {
	award.tap($(this)[0], function() {
		$(".prompt-bg").addClass("hide");
	})
})