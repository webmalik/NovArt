import $ from "jquery";
import Aos from "aos";
import Siema from "siema";
import Swiper from "swiper";
import 'swiper/swiper.css';

export function isWebp() {
	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

export function swiper_init() {
	const sw = new Swiper('.swiper', {
		slidesPerView: 'auto',
		role: {
			group: true,
		},
		spaceBetween: 40,
	});

	sw.init();
}

export function fix() {
	$('.nav__toggle').on('mouseover', function () {
		$('.header__info').css('opacity', '0')
	})
	$('.submenu__list').on('mouseover', function () {
		$('.header__info').css('opacity', '0')
	})
	$('.nav__toggle').on('mouseleave', function () {
		$('.header__info').css('opacity', '1')
	})
	$('.submenu__list').on('mouseleave', function () {
		$('.header__info').css('opacity', '1')
	})
}

export function card() {
	const card_open = $('#open_card')
	const card_close = $('#close_card')
	const card_window = $('.card')
	const card_background = $('.card__background')

	card_close.on('click', function (e) {
		e.preventDefault()
		card_window.css('right', '-41rem')
		card_background.css('opacity', 0)
		setTimeout(function () {
			card_background.css('display', 'none')
		}, 500)
	})

	card_open.on('click', function (e) {
		e.preventDefault()
		card_window.css('right', '0')
		card_background.css('display', 'block')
		card_background.css('opacity', 1)
	})

	card_background.on('click', function (e) {
		e.preventDefault()
		card_window.css('right', '-41rem')
		card_background.css('opacity', 0)
		setTimeout(function () {
			card_background.css('display', 'none')
		}, 500)
	})
}

export function burgerMenu() {
	$('.header__burger').on("click", function (event) {
		$('.header__burger, .header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
}

export function sticky() {
	window.addEventListener('scroll', function () {
		$('header').toggleClass('sticky', window.scrollY > 0);
	});
}

export function pageNav() {
	const headerLinks = $('.header__link');

	headerLinks.each(function () {
		$(this).on('click', function (event) {
			event.preventDefault();

			const targetId = $(this).attr('href');
			const targetElement = $(`${targetId}:first`);
			const targetOffset = targetElement.offset().top - 100;
			$('html, body').animate({
				scrollTop: targetOffset
			}, 800);
		});
	});

	function activateMenuItem() {
		const scrollPosition = $(window).scrollTop();

		headerLinks.each(function () {
			const section = $(`${$(this).attr('href')}:first`);
			if (
				section.offset().top <= scrollPosition + 105 &&
				section.offset().top + section.outerHeight() > scrollPosition + 105
			) {
				headerLinks.removeClass('active');
				headerLinks.parent().removeClass('active');
				$(this).addClass('active');
				$(this).parent().addClass('active');
			}
		});
	}

	$(window).on('scroll', activateMenuItem);
}

export function aos_js() {
	Aos.init();
}

export function slider() {
	const slider = new Siema({
		selector: '.slider',
		loop: true,
		onChange: updatePagination,
		duration: 1000,
		perPage: 4,
		easing: 'ease-out',
	});

	function updatePagination() {
		const paginationItems = Array.from(document.querySelectorAll('.slider-pagination li'));
		paginationItems.map((item, index) => {
			if (index === slider.currentSlide) {
				item.classList.add('active');
			} else {
				item.classList.remove('active');
			}
		});
	}

	function startAutoPlay(intervalTime) {
		let autoPlayInterval = setInterval(function () {
			slider.next();
			updatePagination();
		}, intervalTime);
	}
	updatePagination();
	startAutoPlay(5000);
}

export function tel() {
	var input = document.getElementById("phone-ip");

	input.onfocus = function (e) {
		if (this.value === '') {
			this.value += '+38 (';
		}
	};

	input.onkeyup = function (e) {
		var len = this.value.length;
		if (len === 8) {
			this.value += ') ';
		}
		if (len === 9) {
			this.value += ' ';
		}
		if (len === 12) {
			this.value += '-';
		}
	}
	if (len === 15) {
		this.value += '-';
	}
}