(function($) {

	'use strict';

	// ★ ofi
	if ($('.object-fit-img').length) {
		function ofi() {
			objectFitImages('.object-fit-img');
		}
		ofi();
	}


	// ★ scroll判定
	$(window).on('load scroll',function(){
		var s_top = $(window).scrollTop();
		if(s_top > 0){
			$('body').addClass('js-scroll');
		}else{
			$('body').removeClass('js-scroll');
		}
	});


	// ★ drower & toggle panel
	var toggles = function () {
		var $toggle = $('.o-toggle.menu-toggle');
		var $toggleBtn = $toggle.find('.o-toggle_trigger');

		var $menuOverlay = $('.overlay-menu_drower');
		var $menuCover = $('.menu-cover');

		var $inquiryToggle = $('.o-inquiry_trigger');
		var $inquiryOverlay = $('.overlay-inquiry_drower');
		var $inquiryCover = $('.inquiry-cover');
		var $inquiryClose = $('.close_toggle');
		var $menuLinks = $('.overlay-menu_drower .o-g_navi_list_item a');

		$toggle.each(function () {
			$(this).on('click', function () {

				var $toggle = $(this),
						$toggleIcoNormalTxt = $toggle.find('.o-toggle_trigger_txt');

				$([$(this), $menuCover]).toggleClass('js-active');
				$menuOverlay.toggleClass('js-open');
				if ($(this).stop().hasClass('js-active')) {

					$(".fade-set").each(function (i, elm) {
						var children = $(elm).find(".fade-set-child");
						var tween = gsap.from(children, {
							duration: 1,
							opacity: 0,
							y: 30,
							ease: "expo.out",
							stagger: .1,
						});
					});
					$toggleIcoNormalTxt.text('CLOSE');
				} else {
					$toggleIcoNormalTxt.text('MENU');
				}

			});
		});

		$menuLinks.on('click', function () {
			$toggle.removeClass('js-active');
			$menuOverlay.removeClass('js-open');
		});

	}
	toggles();


	// ★ <a> click event
	$('body').animate({ opacity: '1' }, 500);
	$('a').on('click', function (e) {

		var str = this.getAttribute('href').substring(0, 1);
		var $linktype = $(this).attr('target');
		var $call = this.getAttribute('href').substring(0, 3);

		//固定要素を取得
		var headerElm = document.querySelector('#l-header');
		var anchorElm = document.querySelector('.anchorList');
		var fixedHeight = 0;

		//各デバイス毎に固定要素の合計高さを取得
		if (window.matchMedia( "(max-width: 480px)" ).matches) {
			if(anchorElm){
				fixedHeight = headerElm.offsetHeight + anchorElm.offsetHeight;
			}
			else{
				fixedHeight = headerElm.offsetHeight
			}
		}else if (window.matchMedia( "(max-width: 834px)" ).matches){
			fixedHeight = headerElm.offsetHeight;
		}else{
			fixedHeight = 0;
		}

		if (str === "#") {
			//スムーズスクロールをさせる
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $("[name=' + this.hash.slice(1) + ']");
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - fixedHeight - 30
					}, 700);
					return false;
				}
			}
		} else if ($linktype == "_blank" || $call == "tel") {
			// 何もしない
		} else {
			e.preventDefault(); //ページ遷移をフェードで実行
			var selfPass = $(this).attr('href');
			$('body').animate({
				opacity: '0',
			}, 250, function () {
				location.href = selfPass;
				setTimeout(function () {
					$('body').animate({
						opacity: '1'
					});
				}, 1000);
			});
		}

	});


	// ★ パララックス windows only
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("windows nt") !== -1) {
		// windows用コード
		$("body").addClass("windows");
		var winW = $(window).innerWidth();
		if (winW > 768) {
			luxy.init({
				//以下すべてデフォルト値
				wrapper: '#luxy', //この要素の中身が慣性スクロールの対象になる
				targets: '.luxy-el', //パララックスの対象要素
				wrapperSpeed: 0.08 //慣性スクロールのスピード
			});
		}
	}


	// ★text overflow toggle
	if ($('.overflowText').length) {

		var overFlowText = function() {

			$('.overflowText').each(function() {

				var $textSlideDown = $(this),
						$slideDownText = $textSlideDown.find('.overflowText_inner'),
						$slideDownTextHeight =$slideDownText.height(),
						textHeight = '100',
						maxHeight = ['70px' , '5000px'],
						speed = 400,
						insertHtml = '<div class="more_link_inner"><a class="more_link">もっと見る</a></div>';

				if($slideDownTextHeight > textHeight) {

					$slideDownText.css({ 'max-height' : maxHeight[0] });

					$textSlideDown.append(insertHtml);

					var $more_btn = $textSlideDown.find('.more_link');

					$more_btn.on('click', function(){
//						$(this).toggleClass('js-active').parent().prev().toggleClass('js-active');
						$(this).parent().toggleClass('js-active').prev().toggleClass('js-active');

						if($more_btn.parent().hasClass('js-active')){
							$slideDownText.css({ 'max-height' : maxHeight[1] });
							$more_btn.text('閉じる');
						} else {
							$slideDownText.css({ 'max-height' : maxHeight[0] });
							$more_btn.text('もっと見る');
						}

						var scrollAddPosition = 50,
								n = window.location.href.slice(window.location.href.indexOf('?') + 4),
								p = $textSlideDown.parent().offset().top;

						$('html,body').animate({
							scrollTop: p - 100
						}, speed );
						return false;
					});
				}

			});

		}
		//    overFlowText();

		var widthFlag = '';
		$(window).on('load resize', function () {
			overFlowSlide();
		});
		var overFlowSlide = function() {

			var windowWidth = $(window).width(),
					bp = 480;

			// 画面幅480以下でフラグがpcでない時
			if (windowWidth <= bp && widthFlag != 'pc') {
				widthFlag = 'pc';
				overFlowText();

				// 画面幅480以上でフラグがspでない時
			} else if (windowWidth > bp && widthFlag != 'sp') {
				widthFlag = 'sp';
				$('.overflowText_inner').css({ 'max-height' : 'none' });
				$('.more_link_inner').remove();
			}

		}

		}


})(jQuery);


// ★ scroll anim - group stagger (gsap)
function intersectAnim() {

	const boxes = document.querySelectorAll('.scroll-reveal');
	const boxesArray = Array.prototype.slice.call(boxes, 0);
	const options = {
		root: null,
//		rootMargin: '-20% 0px',
		rootMargin: '-10% 0px -10%',
		threshold: 0
	};

	const observer = new IntersectionObserver(handler, options);

	boxesArray.forEach(function (boxes) {
		observer.observe(boxes);
	});

	//	document.querySelectorAll('.animate').forEach(function (elm) {
	//		gsap.set(elm , { opacity: 0 });
	//	});
	//	document.querySelectorAll('.animate-up').forEach(function (elm) {
	//		gsap.set(elm , { y: 50 });
	//	});
	//	document.querySelectorAll('.animate-down').forEach(function (elm) {
	//		gsap.set(elm , { y: -50 });
	//	});
	//	document.querySelectorAll('.animate-left').forEach(function (elm) {
	//		gsap.set(elm , { x: 50 });
	//	});
	//	document.querySelectorAll('.animate-right').forEach(function (elm) {
	//		gsap.set(elm , { x: -50 });
	//	});
	gsap.set(document.querySelectorAll('.animate'), {
		opacity: 0
	});
	gsap.set(document.querySelectorAll('.animate-up'), {
		y: 50
	});
	gsap.set(document.querySelectorAll('.animate-down'), {
		y: -50
	});
	gsap.set(document.querySelectorAll('.animate-left'), {
		x: 50
	});
	gsap.set(document.querySelectorAll('.animate-right'), {
		x: -50
	});

	function handler(entries, observer) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				const fadeEl = entry.target.querySelectorAll('.animate');
				gsap.to(fadeEl, {
					duration: 1.2,
					opacity: 1,
					x: 0,
					y: 0,
					ease: "expo.out",
					stagger: .1,
					//            stagger: {
					//              each: .1,
					//              from: "random",
					//              ease: "power2.in",
					//              grid: "auto"
					//            },
					onComplete: animate(entry.target)
				});
				observer.unobserve(entry.target);
			}
		});
	}

	function animate(elm) {
		elm.classList.add('js-active')
	}

}
intersectAnim();


// ★ scroll anim - addClass
function intersectAnimClass() {
	const animation = document.querySelectorAll(".scroll-class");
	const animationArray = Array.prototype.slice.call(animation, 0);
	const options = {
		root: null,
//		rootMargin: '-20% 0px',
		rootMargin: '-10% 0px -10%',
		threshold: 0
	};
	const observer = new IntersectionObserver(doWhenIntersect, options);
	animationArray.forEach(function (animation) {
		observer.observe(animation);
	});

	$(".scroll-class").each(function () {
		var targetAnime = $(this).offset().top;
		var windowHeight = $(window).height();
		if (targetAnime < windowHeight) {
			$(this).addClass("js-active");
		}
	});

	function doWhenIntersect(entries) {
		const entriesArray = Array.prototype.slice.call(entries, 0);

		entriesArray.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add("js-active");
			}
		});
	}
}
intersectAnimClass();
