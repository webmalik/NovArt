import $ from "jquery";
import Aos from "aos";
import Siema from "siema";
import Swiper from "swiper";
import 'swiper/swiper.css';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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
	const nav__toggle = $('.nav__toggle')
	const submenu = $('.submenu__list')
	const header__info = $('.header__info')
	const nav__link = $('.nav__main .nav__item a')
	const logo_img = $('#logo_img')
	const user_img = $('#user_img')
	const card_img = $('#card_img')

	nav__toggle.on('mouseover', function () {
		header__info.css('opacity', '0')
		nav__link.css('color', '#333')
		logo_img.attr('src', 'img/logo.svg')
		user_img.attr('src', 'img/user.svg')
		card_img.attr('src', 'img/card.svg')
	})
	submenu.on('mouseover', function () {
		header__info.css('opacity', '0')
		nav__link.css('color', '#333')
		logo_img.attr('src', 'img/logo.svg')
		user_img.attr('src', 'img/user.svg')
		card_img.attr('src', 'img/card.svg')
	})
	nav__toggle.on('mouseleave', function () {
		header__info.css('opacity', '1')
		nav__link.css('color', '#fff')
		logo_img.attr('src', 'img/logo-white.svg')
		user_img.attr('src', 'img/user-white.svg')
		card_img.attr('src', 'img/card-white.svg')
	})
	submenu.on('mouseleave', function () {
		header__info.css('opacity', '1')
		nav__link.css('color', '#fff')
		logo_img.attr('src', 'img/logo-white.svg')
		user_img.attr('src', 'img/user-white.svg')
		card_img.attr('src', 'img/card-white.svg')
	})
}

export function filter() {
	const link = $('#filter')
	const filter = $('.order__filter')
	const wrapper = $('.order__wrapper')
	let active = true

	link.on('click', function (e) {
		if (active) {
			filter.addClass('filter-noactive')
			setTimeout(function () {
				filter.hide();
				wrapper.css('grid-template-columns', '1fr')
			}, 600)
			active = false
		} else {
			filter.show();
			setTimeout(function () {
				wrapper.css('grid-template-columns', '1fr 3fr')
			}, 100)
			filter.removeClass('filter-noactive')
			active = true
		}
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

export function fancy() {
	const mainImageLink = document.querySelector('.order-item__main-image a');
	const thumbnailImages = document.querySelectorAll('.order-item__thumbnail img');

	const thumbnailArray = Array.from(thumbnailImages);
	const galleryItems = thumbnailArray.map((thumbnail) => ({
		src: thumbnail.getAttribute('src'),
		caption: thumbnail.getAttribute('alt')
	}));

	mainImageLink.addEventListener('click', (event) => {
		event.preventDefault();

		const mainImageIndex = thumbnailArray.findIndex((thumbnail) => {
			const thumbnailSrc = thumbnail.getAttribute('src');
			return thumbnailSrc === mainImageLink.querySelector('img').getAttribute('src');
		});

		Fancybox.show(galleryItems, {
			startIndex: mainImageIndex,
			onClose: () => {
				mainImageLink.innerHTML = '';
			}
		});
	});

	thumbnailImages.forEach((thumbnail, index) => {
		thumbnail.addEventListener('click', (event) => {
			event.preventDefault();

			const imagePath = thumbnail.getAttribute('src');
			const imageCaption = thumbnail.getAttribute('alt');

			mainImageLink.innerHTML = `<img src="${imagePath}" alt="${imageCaption}" />`;

			// Переміщення мініатюр до позиції 1
			thumbnailArray.forEach((thumb, thumbIndex) => {
				if (thumbIndex === 0) {
					thumb.classList.add('active');
				} else {
					thumb.classList.remove('active');
				}
			});

			// Прокручування до видимої мініатюри
			thumbnail.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
		});
	});

	Fancybox.bind('[data-fancybox="gallery"]', {
		toolbar: "auto",
		loop: true,
		animationEffect: "zoom-in-out",
		transitionEffect: "fade",
		buttons: ["zoom", "slideShow", "fullScreen", "thumbs", "close"],
		Thumbs: {
			autoStart: true,
			hideOnClose: true,
		},
		touch: {
			vertical: false,
		},
	});
}

export function selectborder() {
	const imageContainer = document.querySelector('.order-item__select');
	const inputElement = document.querySelector('.order-item__value input');

	imageContainer.addEventListener('click', (event) => {
		const clickedImage = event.target;

		if (clickedImage.tagName === 'IMG') {
			const allImages = imageContainer.querySelectorAll('img');
			allImages.forEach((image) => {
				image.classList.remove('active');
			});
			clickedImage.classList.add('active');
			const altText = clickedImage.getAttribute('alt');
			inputElement.value = altText;
		}
	});
}

export function din() {
	const buttonContainer = document.querySelector('.order-item__select-button');
	const inputElement = document.querySelector('#input__din');

	buttonContainer.addEventListener('click', (event) => {
		const clickedButton = event.target;

		if (clickedButton.tagName === 'BUTTON') {
			const allButtons = buttonContainer.querySelectorAll('button');
			allButtons.forEach((button) => {
				button.classList.remove('active');
			});

			clickedButton.classList.add('active');

			const buttonValue = clickedButton.innerText;
			inputElement.value = buttonValue;
		}
	});
}

export function item_location() {
	let item = $('.cart__item')
	item.on('click', function () {
		location.assign('cart-item.html')
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
