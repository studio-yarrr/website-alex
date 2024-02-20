document.addEventListener("DOMContentLoaded", () => {

  const xl = matchMedia('(max-width: 1024px)');

  class Menu {
    constructor(menuElement, buttonElement) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement;
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement;
      this.overlay = document.createElement('div');
      this.overlay.hidden = true;
      this._init();
    }

    _init() {
      document.body.appendChild(this.overlay);
      this.overlay.classList.add('overlay');

      this.overlay.addEventListener('click', this.toggleMenu.bind(this));
      this.button.addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open');
      this.button.classList.toggle('menu-button--active');
      this.overlay.hidden = !this.overlay.hidden;

      if (this.isMenuOpen()) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }

    closeMenu() {
      this.menu.classList.remove('header__nav--active');
      this.button.classList.remove('header__menu-button--active');
      this.overlay.hidden = true;

      this.enableScroll();
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open');
    }

    disableScroll() {
      // Get the current page scroll position;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      window.onscroll = function () { };
    }
  }

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu-button');

  if (menu && menuButton) {
    new Menu(menu, menuButton);
  }

  const header = document.querySelector('header');

  let handler;

  function scrollAdd() {
    /* ... */
    handler = throttle(function (event) {
      scrollHeader();
    }, 500);
    document.addEventListener('scroll', handler, false);
  }

  function scrollRemove() {
    /* ... */
    document.removeEventListener('scroll', handler, false);
  }

  if (xl.matches) {
    scrollAdd();
    document.removeEventListener('scroll', scrollHeader);
  } else {
    document.addEventListener('scroll', scrollHeader);
    scrollRemove();
  }

  xl.addEventListener('change', () => {
    if (xl.matches) {
      document.removeEventListener('scroll', scrollHeader);
      scrollAdd();
    } else {
      document.addEventListener('scroll', scrollHeader);
      scrollRemove();
    }
  });

  function disableScroll() {
    // Get the current page scroll position;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');

    // if any scroll is attempted, set this to the previous value;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  }

  var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  function scrollHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    };
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    };
    const num = 200;

    if (prevScrollpos >= currentScrollPos) {
      header.classList.remove('out');
    } else {
      header.classList.add('out');
    };
    if (currentScrollPos < num) {
      header.classList.remove('out');
    }
    prevScrollpos = currentScrollPos;
  };

  function initHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const num = xl.matches ? 50 : 150;
    if (currentScrollPos > num) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    }
  }

  initHeader();

  function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2);
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1);

      isThrottled = true;

      setTimeout(function () {
        isThrottled = false; // (3);
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  const swiperWrappers = document.querySelectorAll('.main-wrapper, .minteresting, .masterpiece, .ngraph')
  if (swiperWrappers.length) {
    swiperWrappers.forEach(wrapper => {
      const swiper = wrapper.querySelector('.swiper');
      const next = wrapper.querySelector('.next');
      const prev = wrapper.querySelector('.prev');
      const pagination = wrapper.querySelector('.swiper-pagination')
      if (swiper) {
        new Swiper(swiper, {
          loop: true,
          slidesPerView: 'auto',
          speed: 500,
          grabCursor: true,
          navigation: {
            prevEl: prev,
            nextEl: next,
          },
          pagination: {
            el: pagination,
            clickable: true,
          }
        })
      }
    })
  }
  setTimeout(() => {
    const swiperWrappersNoLoop = document.querySelectorAll('.mbelieve, .pokaz, .private-bot')
    if (swiperWrappersNoLoop.length) {
      swiperWrappersNoLoop.forEach(wrapper => {
        const swiper = wrapper.querySelector('.swiper');
        const next = wrapper.querySelector('.next');
        const prev = wrapper.querySelector('.prev');

        if (swiper) {
          new Swiper(swiper, {
            slidesPerView: 'auto',
            speed: 500,
            navigation: {
              prevEl: prev,
              nextEl: next,
            }
          })
        }
      })
    }
    const swiperMLK = document.querySelector('.mlk-swiper');
    if (swiperMLK) {
      let init = false;
      let swiper = null;
      const swiperpagination = swiperMLK.querySelector('.swiper-pagination')
      function swiperCard() {
        if (xl.matches) {
          if (!init) {
            init = true;
            swiper = new Swiper(swiperMLK, {
              slidesPerView: "auto",
              pagination: {
                el: swiperpagination,
                type: 'progressbar',
              },
            });
          }
        } else if (init && swiper) {
          swiper.destroy();
          init = false;
        }
      }
      swiperCard();
      window.addEventListener("resize", swiperCard);
    }

    const pgallery = document.querySelector('.pgallery')
    if (pgallery) {
      const swiperT = pgallery.querySelector('.swiper.--top');
      const swiperB = pgallery.querySelector('.swiper.--bot');

      const speed = 15000;
      const option = {
        slidesPerView: 'auto',
        speed: speed,
        autoplay: {
          delay: 0,
        }
      }
      if (swiperT) {
        const slides = swiperT.querySelectorAll('.swiper-slide')
        if (slides.length) {
          new Swiper(swiperT, Object.assign(option, { loop: slides.length > 4 }))
        }

      }
      if (swiperB) {
        const slides = swiperB.querySelectorAll('.swiper-slide')
        if (slides.length) {
          new Swiper(swiperB, Object.assign(option, { loop: slides.length > 4 }))
        }

      }
    }

    const phowswipers = document.querySelectorAll('.phow-swiper, .nhowto-swiper')
    if (phowswipers.length) {
      phowswipers.forEach(swiper => {
        const swiperpagination = swiper.querySelector('.swiper-pagination')
        new Swiper(swiper, {
          slidesPerView: "auto",
          speed: 500,
          grabCursor: true,
          pagination: {
            el: swiperpagination,
            type: 'progressbar',
          },
        })
      })
    }

    const accordionBtns = document.querySelectorAll('.accordion-btn')
    if (accordionBtns.length) {
      accordionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          this.classList.toggle('opened')
        })
      })
    }

    Fancybox.bind('[data-fancybox]:not(.swiper-slide-duplicate)', {
      Image: {
        zoom: false,
      },
      showClass: "fancybox-fadeIn",
      hideClass: "fancybox-fadeOut",
    });
  }, 0)

});











