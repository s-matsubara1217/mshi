(function($) {
	
	'use strict';
	
	// ★ hello animetion
	var helloAnim = function(){
		let target = $(".js-hello");

		let header = $('.js-hello-header');
		let opacity = target.find($('.js-hello-opacity'));
		let slide = target.find($('.js-hello-slide'));
		let convertion = $('.js-hello-convertion');

		//copy line text
		let sliceTxt = $('.js-hello-splitText');
		sliceTxt.each(function(i , elm) {
			let target = $(elm);
			let lineTarget = target.find(".sliceText > span");
			let slice = target.find(".sliceText");
			lineTarget.prepend('<span class="moveLine"></span>');
			slice.each(function () {
				var setElm = $(this);
				setElm.children().addBack().contents().each(function () {
					var elmThis = $(this);
					if (this.nodeType == 3) {
						var $this = $(this);
						$this.replaceWith($this.text().replace(/(\S)/g, '<span class="textSplit" style="display: inline-block;">$&</span>'));
					}
				});
			});
		});

		let textLine1 = $('.-line1');
		let textLine1Move = textLine1.find($('.moveLine'));
		let textLine1Split = textLine1.find($('.textSplit'));

		let textLine2 = $('.-line2');
		let textLine2Move = textLine2.find($('.moveLine'));
		let textLine2Split = textLine2.find($('.textSplit'));

		let textLine3 = $('.-line3');
		let textLine3Move = textLine3.find($('.moveLine'));
		let textLine3Split = textLine3.find($('.textSplit'));

		let textLineEn = $('.js-hello-textEn');
		let contents = $('.js-hello-contents');

		let tl = gsap.timeline();

		tl
			.delay(0.1)

		// text line1
			.from(textLine1Move, {
			duration: 0.5,
			scale: 1.5,
			x: 100,
			//				y: -50,
			opacity: 0,
		}, '-=0')
			.to(textLine1Move, {
			duration: 0.7,
			left: '100%',
			ease: 'power4.out',
		}, '-=0')
			.from(textLine1Split, {
			duration: 0.7,
			opacity: 0,
			scale: 0.8,
			ease: "elastic.out(1.2, 1)",
			stagger: {
				each: 0.03,
			},
		}, '-=0.7')
			.to(textLine1Move, {
			duration: 0.2,
			opacity: 0,
			scale: 0.7,
		}, '-=0.5')

		// text line2
			.from(textLine2Move, {
			duration: 0.5,
			scale: 1.5,
			x: 100,
			//				y: -50,
			opacity: 0,
		}, '-=1.3')
			.to(textLine2Move, {
			duration: 0.7,
			left: '100%',
			ease: 'power4.out',
		}, '-=0.7')
			.from(textLine2Split, {
			duration: 0.7,
			opacity: 0,
			scale: 0.8,
			ease: "elastic.out(1.2, 1)",
			stagger: {
				each: 0.03,
			},
		}, '-=0.7')
			.to(textLine2Move, {
			duration: 0.2,
			opacity: 0,
			scale: 0.7,
		}, '-=0.5')

		// text line3
			.from(textLine3Move, {
			duration: 0.5,
			scale: 1.5,
			x: 100,
			//				y: -50,
			opacity: 0,
		}, '-=1.3')
			.to(textLine3Move, {
			duration: 0.7,
			left: '100%',
			ease: 'power4.out',
		}, '-=0.7')
			.from(textLine3Split, {
			duration: 0.7,
			opacity: 0,
			scale: 0.8,
			ease: "elastic.out(1.2, 1)",
			stagger: {
				each: 0.03,
			},
		}, '-=0.7')
			.to(textLine3Move, {
			duration: 0.2,
			opacity: 0,
			scale: 0.7,
		}, '-=0.5')

		// text english
			.from(textLineEn, {
			duration: 1,
			opacity: 0,
			scale: 0.95,
			ease: "expo.out",
		}, '-=0.7')

			.from(opacity, {
			duration: 1,
			opacity: 0,
			//			y: 100,
			scale: 0.8,
			//			ease: "power4.out",
			ease: "back.out(1.7)",
			stagger: {
				each: 0.05,
				from: "random",
				//				grid: "auto"
			},
		}, '-=0.8')
			.from(slide, {
			duration: 1,
			opacity: 0,
			scale: 0.9,
			//			y: 100,
			ease: "back.out(2)",
			stagger: {
				each: 0.1,
				from: "random",
				//				grid: "auto"
			},
		}, '-=0.8')
			.from(header, {
			duration: 0.5,
			opacity: 0,
			y: -50,
			ease: "expo.out",
		}, '-=0.7')
			.from(convertion, {
			duration: 0.5,
			opacity: 0,
			y: 50,
			ease: "expo.out",
		}, '-=0.7')
			.from(contents, {
			duration: 0.5,
			opacity: 0,
			ease: "expo.out",
		}, '-=0');
	}
//	helloAnim();
	
	// ★ WebStorageAPIを使って初回アクセス時だけの処理
	var webStorage = function(){
		if(sessionStorage.getItem('access')){
			// 2回目以降アクセス
		} else {
			// 初回アクセス
			helloAnim();
			sessionStorage.setItem('access', 0);

		}
	}
	webStorage();
	
	
	// ★ main bg slider 4
	window.addEventListener('DOMContentLoaded', function () {
		
		var options = {
			loop: true,
			speed: 750,
			parallax: true,
			allowTouchMove: false,
			autoplay: {
				delay: 5000,
				stopOnLastSlide: false,
				disableOnInteraction: false,
				reverseDirection: false
			},
		};
		var swiper = new Swiper('.mv_swiper', options );
		
	});
	
	
	// ★ news slider (説明会)
	window.addEventListener('DOMContentLoaded', function () {
		
		var newsSwiper = [];
		var newsSwiperElm = $('.newsList_swiper');
		
		newsSwiperElm.each(function () {
			
			var itemNum = $(this).find('.swiper-slide').length;
			
			newsSwiper = new Swiper($(this), {
				loop: itemNum > 1,
				slideToClickedSlide: true,
				centeredSlides: true,
				speed: 500,
				slidesPerView: 'auto',
				watchOverflow: true,  // スライドの枚数が1枚しかないときにボタンやページネーションを削除する ※loop が trueだと機能しない。
				autoplay: {
//					delay: 4500,
					delay: 2500,
					stopOnLastSlide: false,
					disableOnInteraction: false,
					reverseDirection: false
				},
				navigation: {
					nextEl: '.newsList_swiper_nav .swiper-button-next',
					prevEl: '.newsList_swiper_nav .swiper-button-prev',
				},
				breakpoints: {
					834: {
						centeredSlides: false,
					},
				}
			});
			
			newsSwiperElm.mouseenter(function(){
				newsSwiper.autoplay.stop();
//				console.log('on');
			}).mouseleave(function(){
				newsSwiper.autoplay.start();
//				console.log('leave');
			});
			
		});
		
	});
	
	
	// ★ staff slider
	window.addEventListener('DOMContentLoaded', function () {
		
		var staffSwiper = [];
		var staffSwiperElm = $('.staff_swiper');
		
		staffSwiperElm.each(function () {
			
			var itemNum = $(this).find('.swiper-slide').length;
			
			staffSwiper = new Swiper($(this), {
				loop: itemNum > 1,
				slideToClickedSlide: true,
				centeredSlides: true,
				speed: 500,
				slidesPerView: 'auto',
				watchOverflow: true,  // スライドの枚数が1枚しかないときにボタンやページネーションを削除する ※loop が trueだと機能しない。
				autoplay: {
					delay: 6000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
					reverseDirection: false
				},
				pagination: {
					el: '.staff_swiper_nav .swiper-pagination',
					type: 'fraction',
				},
				navigation: {
					nextEl: '.staff_swiper_nav .swiper-button-next',
					prevEl: '.staff_swiper_nav .swiper-button-prev',
				},
			});
			
			staffSwiperElm.mouseenter(function(){
				staffSwiper.autoplay.stop();
//				console.log('on');
			}).mouseleave(function(){
				staffSwiper.autoplay.start();
//				console.log('leave');
			});
			
		});
		
	});
	
	
})(jQuery);
