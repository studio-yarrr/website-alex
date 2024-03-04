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
      if (xl.matches) {
        document.documentElement.classList.add('disable-scroll')
      }
      // if any scroll is attempted, set this to the previous value;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      document.documentElement.classList.remove('disable-scroll')
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
    const swiperWrappersNoLoop = document.querySelectorAll('.mbelieve, .pokaz, .private-bot, .lotsswiper, .gallery-wrapper, .nearest-swiper-wrapper')
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

  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl, sel;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        sel = this.parentNode.previousSibling.classList.add('select-selected--active')
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);

  const viewBtns = document.querySelectorAll('[data-view]')
  const viewList = document.querySelector('.lots-list')

  if (viewList && viewBtns.length) {
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        viewList.dataset.content = this.dataset.view
      })
    })
  }

  const lotWrapper = document.querySelector('.lot-wrapper');

  if (lotWrapper) {
    const swiper = lotWrapper.querySelector('.lot-swiper');
    const tmb = lotWrapper.querySelector('.lot-thumbs')
    const slides = swiper.querySelectorAll('.swiper-slide img');

    if (swiper && slides.length) {

      const wrap = tmb.querySelector('.swiper-wrapper')
      if (wrap) {
        slides.forEach(img => {
          const slide = document.createElement('div')
          slide.classList.add('swiper-slide', 'img-contain')
          slide.appendChild(img.cloneNode(true))
          wrap.appendChild(slide);
        })
      }



      const thumbs = new Swiper(tmb, {
        direction: 'vertical',
        loop: false,
        slidesPerView: 'auto',
        grabCursor: true,
        slideToClickedSlide: true,
      })

      const thumbsSlides = tmb.querySelectorAll('.swiper-slide');

      if (thumbsSlides.length) {
        thumbsSlides.forEach((el, i) => {
          el.addEventListener('click', function () {
            thumbsSlides.forEach(thm => {
              thm.classList.remove('active');
            })
            this.classList.add('active')
            mainSwiper.slideTo(i);
          })
        })
      }

      const mainSwiper = new Swiper(swiper, {
        loop: false,
        slidesPerView: 1,
        grabCursor: true,
        on: {
          slideChange: function () {
            if (thumbs) {
              if (thumbs.slides.length) {
                const slides = Array.from(thumbs.slides)
                slides.forEach(el => {
                  el.classList.remove('active');
                })
                slides[this.activeIndex].classList.add('active')
              }
            }
          },
          init: function () {
            if (thumbs.slides.length) {
              const slides = Array.from(thumbs.slides)
              slides[this.activeIndex].classList.add('active')
            }
          }
        }
      })

      mainSwiper.controller.control = thumbs
      thumbs.controller.control = mainSwiper


    }
  }

  const radionbtns = document.querySelectorAll('.radio-container .radio-btn')
  if (radionbtns.length) {
    radionbtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const closeAllBlocks = () => {
          const parent = event.target.closest('.radio-container')
          let active = null
          if (parent) {
            active = parent.querySelector('.select-arrow-active')
          }
          if (active && active !== this) {
            this.classList.remove('select-arrow-active')
          }
          if (!parent) {
            const radiocontainers = document.querySelectorAll('.radio-container .select-arrow-active')
            if (radiocontainers.length) {
              radiocontainers.forEach(el => {
                el.classList.remove('select-arrow-active')
              })
            }
            document.removeEventListener('click', closeAllBlocks)
          }
        }

        this.classList.toggle('select-arrow-active')
        if (this.classList.contains('select-arrow-active')) {
          document.addEventListener('click', closeAllBlocks)
        } else {
          document.removeEventListener('click', closeAllBlocks)
        }
      })
    })
  }

  const filterbtn = document.querySelector('.btn-filter')
  if (filterbtn) {
    filterbtn.addEventListener('click', function () {
      this.parentElement.classList.toggle('active')
    })
  }

  const informationBlock = document.querySelector('.information-container')
  if (informationBlock) {
    const btns = informationBlock.querySelectorAll('.information-btn')
    const content = informationBlock.querySelector('.information-content')
    if (btns.length && content) {
      btns.forEach(el => {
        el.addEventListener('click', function () {
          const next = this.nextElementSibling
          if (next) {
            content.innerHTML = next.innerHTML
          }
        })
      })
      btns[0].click()
    }
  }
});











