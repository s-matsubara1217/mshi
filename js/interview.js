(function($) {
	
	'use strict';
	
	window.addEventListener('DOMContentLoaded', function () {
		
		var swiper = [];
		var swiperElm = $('.mySwiper');
		
		swiperElm.each(function () {
			
			var itemNum = $(this).find('.swiper-slide').length;
			
			swiper = new Swiper($(this), {
//				loop: itemNum > 1,
				speed: 500,
				slidesPerView: '1',
				watchOverflow: true,
				autoplay: {
					delay: 6000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
					reverseDirection: false
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
			});
			
			swiperElm.mouseenter(function(){
				swiper.autoplay.stop();
			}).mouseleave(function(){
				swiper.autoplay.start();
			});
			
		});
		
	});
	
	
})(jQuery);
