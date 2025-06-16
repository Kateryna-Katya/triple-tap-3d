import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
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

document.addEventListener('DOMContentLoaded', initSwipers);

window.addEventListener('resize', () => {
  clearTimeout(window._swiperResizeTimeout);
  window._swiperResizeTimeout = setTimeout(initSwipers, 300);
});