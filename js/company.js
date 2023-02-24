(function($) {
	
	'use strict';
	
	window.addEventListener('DOMContentLoaded', function () {
		
		var topNewjobSwiper = new Swiper('.tickerSwiper', {
			loop: true,
			autoplay:{
				delay: 1,
				disableOnInteraction: false,
			},
			slidesPerView: 'auto',
			spaceBetween: 30,
			centeredSlides: false,
			freeMode: true,
			speed: 9000,
			breakpoints: {
				834: {
					spaceBetween: 0,
				},
			},
		});
		
	});
	
	
})(jQuery);
