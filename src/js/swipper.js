import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const swiperConfigs = [
  {
    selector: '.game-swiper',
    slideClass: 'game-swiper-slide',
    wrapperClass: 'game-swiper-wrapper',
    navigation: {
      nextEl: '.custom-navigation .custom-next',
      prevEl: '.custom-navigation .custom-prev',
    },
  },
];

const swiperInstances = {};

function initSwipers() {
  const screenWidth = window.innerWidth;

  swiperConfigs.forEach(config => {
    const container = document.querySelector(config.selector);
    if (!container) return;

    const id = config.selector;

    if (swiperInstances[id]) {
      swiperInstances[id].destroy(true, true);
      delete swiperInstances[id];
    }

    if (config.selector === '.game-swiper') {
      if (screenWidth < 1439) {
        const swiper = new Swiper(container, {
          modules: [Navigation],
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          slideClass: config.slideClass,
          wrapperClass: config.wrapperClass,
          direction: 'horizontal',
          navigation: config.navigation,
        });
        swiperInstances[id] = swiper;
      }
    }
  });
}

function initReviewSwipers() {
  const reviewsOneEl = document.querySelector('.reviews-swiper-one');
  const reviewsTwoEl = document.querySelector('.reviews-swiper-two');

  if (reviewsOneEl) {
    new Swiper(reviewsOneEl, {
      modules: [Autoplay],
      loop: true,
      spaceBetween: 20,
      speed: 6000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
          1439: {
          slidesPerView: 2.5,
        },
      },
    });
  }

  if (reviewsTwoEl) {
    new Swiper(reviewsTwoEl, {
      modules: [Autoplay],
      loop: true,
      spaceBetween: 20,
      speed: 7000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.2,
        },
        1439: {
          slidesPerView: 2,
        },
      },
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  initSwipers();
  initReviewSwipers();
});

window.addEventListener('resize', () => {
  clearTimeout(window._swiperResizeTimeout);
  window._swiperResizeTimeout = setTimeout(initSwipers, 300);
});