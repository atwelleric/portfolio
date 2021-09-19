function init() {
	const slides = document.querySelectorAll('.slide');
	const pages = document.querySelectorAll('.page');
	const backgrounds = [
		`radial-gradient(#586D37, #1D1D1D)`,
		`radial-gradient(#7D6C28, #0B1023)`,
		`radial-gradient(#7E8DC9, #0B1023)`,
		`radial-gradient(#89B0AE, #0B1023)`,
		`radial-gradient(#387367, #0B1023)`,
	];
	//tracker
	let current = 0;
	let scrollSlide = 0;

	slides.forEach((slide, index) => {
		slide.addEventListener('click', function () {
			changeDots(this);
			nextSlide(index);
			scrollSlide = index;
		});
	});

	function changeDots(dot) {
		slides.forEach((slide) => {
			slide.classList.remove('active');
		});
		dot.classList.add('active');
	}

	function nextSlide(pageNumber) {
		const nextPage = pages[pageNumber];
		const currentPage = pages[current];
		const nextLeft = nextPage.querySelector('.hero .image-left');
		const nextRight = nextPage.querySelector('.hero .image-right');
		const currentLeft = currentPage.querySelector('.hero .image-left');
		const currentRight = currentPage.querySelector('.hero .image-right');
		const nextText = nextPage.querySelector('.details');
		const portfolio = document.querySelector('.portfolio');

		const tl = new TimelineMax();

		tl.fromTo(currentLeft, 0.3, { y: '-10%' }, { y: '-100%' })
			.fromTo(currentRight, 0.3, { y: '10%' }, { y: '-100%' }, '-=0.2')
			.to(portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
			.fromTo(
				currentPage,
				0.3,
				{ opacity: 1, pointerEvents: 'all' },
				{ opacity: 0, pointerEvents: 'none' }
			)
			.fromTo(
				nextPage,
				0.3,
				{ opacity: 0, pointerEvents: 'none' },
				{ opacity: 1, pointerEvents: 'all' },
				'-=0.6'
			)
			.fromTo(nextLeft, 0.3, { y: '-100%' }, { y: '-10%' }, '-=0.6')
			.fromTo(nextRight, 0.3, { y: '-100%' }, { y: '10%' }, '-=0.8')
			.fromTo(nextText, 0.3, { opacity: 0, y: 0 }, { opacity: 1, y: 0 })
			.set(nextLeft, { clearProps: 'all' })
			.set(nextRight, { clearProps: 'all' });

		current = pageNumber;
	}

	document.addEventListener('wheel', throttle(scrollChange, 1500));
	document.addEventListener('touchMove', throttle(scrollChange, 1500));

	function switchDots(dotNumber) {
		const activeDot = document.querySelectorAll('.slide')[dotNumber];
		slides.forEach((slide) => {
			slide.classList.remove('active');
		});
		activeDot.classList.add('active');
	}

	function scrollChange(e) {
		if (e.deltaY > 0) {
			scrollSlide += 1;
		} else {
			scrollSlide -= 1;
		}

		if (scrollSlide > 4) {
			scrollSlide = 0;
		}
		if (scrollSlide < 0) {
			scrollSlide = 4;
		}
		switchDots(scrollSlide);
		nextSlide(scrollSlide);
	}

	// Hamburger menu
	const hamburger = document.querySelector('.menu');
	const hamburgerLines = document.querySelectorAll('.menu line');
	const navOpen = document.querySelector('.nav-open');
	const contact = document.querySelector('.contact');
	const social = document.querySelector('.social');
	const logo = document.querySelector('.logo');

	const tl = new TimelineMax({ paused: true, reversed: true });

	tl.to(navOpen, 0.5, { y: 0 })
		.fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.1')
		.fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.5')
		.fromTo(logo, 0.2, { color: 'white' }, { color: 'black' }, '-=1')
		.fromTo(
			hamburgerLines,
			0.2,
			{ stroke: 'white' },
			{ stroke: 'black' },
			'-=.5'
		);

	hamburger.addEventListener('click', () => {
		tl.reversed() ? tl.play() : tl.reverse();
	});

	const menuLinks = document.querySelector('.menu-links');
	const hamburgerLinksLines = document.querySelectorAll('.menu-links line');
	const iconSection = document.querySelector('.icon-section');
	const icon = document.querySelectorAll('.icon');
	// const social = document.querySelector('.social');
	// const logo = document.querySelector('.logo');

	const tlTwo = new TimelineMax({ paused: true, reversed: true });

	tlTwo
		.to(iconSection, 0.5, { x: 0 })
		.fromTo(icon, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.1')
		// .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.5')
		// .fromTo(logo, 0.2, { color: 'white' }, { color: 'black' }, '-=1')
		.fromTo(
			hamburgerLinksLines,
			0.2,
			{ stroke: 'gray' },
			{ stroke: 'gray' },
			'-=.5'
		);

	menuLinks.addEventListener('click', () => {
		tlTwo.reversed() ? tlTwo.play() : tlTwo.reverse();
	});
}

function throttle(func, limit) {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

init();
