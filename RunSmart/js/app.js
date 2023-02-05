'use strict';
function tabsCatalog(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClassTab,
  activeClassContent
) {
  let tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove(activeClassContent);
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClassTab);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add(activeClassContent);
    tabs[i].classList.add(activeClassTab);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function (event) {
    const target = event.target;

    if (
      target &&
      (target.classList.contains(tabsSelector.slice(1)) ||
        target.parentElement.classList.contains(tabsSelector.slice(1)))
    ) {
      tabs.forEach((item, i) => {
        if (target == item || target.parentElement == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

function tabsLink(classSelector) {
  const tabsLink = document.querySelectorAll(classSelector);
  tabsLink.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const parentElement = event.target.parentElement;
      parentElement.classList.remove(`${parentElement.classList[0]}_active`);
      let necessaryElement;
      if (classSelector === '.product__link') {
        necessaryElement = parentElement.nextElementSibling;
        necessaryElement.classList.add('product__info_active');
      } else {
        necessaryElement = parentElement.previousElementSibling;
        necessaryElement.classList.add('product__top-main_active');
      }
    });
  });
}

function actionsByOpenModal(modalSelector) {
  document.querySelector('.modal').classList.add('modal_open');
  const modal = document.querySelector(modalSelector);
  modal.classList.add('modal__wrapper_active');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${calcWidthScroll()}px`;
}

function actionsByCloseModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  document.querySelector('.modal').classList.remove('modal_open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '0px';
  modal.classList.remove('modal__wrapper_active');
}

function сonditionsCloseModal(modalSelector) {
  document.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('modal') ||
      event.target.classList.contains('modal__close')
    )
      actionsByCloseModal(modalSelector);
  });

  document.addEventListener('keydown', (event) => {
    if (event.code == 'Escape') {
      actionsByCloseModal(modalSelector);
    }
  });
}

function workModalWindow(modalTriggerSelector, modalSelector) {
  const modalTrigger = document.querySelectorAll(modalTriggerSelector);

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      actionsByOpenModal(modalSelector);
      сonditionsCloseModal(modalSelector);
    });
  });
}

function calcWidthScroll() {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  document.body.append(div);
  let paddingScrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return paddingScrollWidth;
}

function closeAllModalsWindow() {
  const modals = document.querySelectorAll('.modal__wrapper');
  modals.forEach((modal) => {
    if (modal.classList.contains('modal__wrapper_active')) {
      modal.classList.remove('modal__wrapper_active');
    }
  });
}

function donePostData(modalDoneSelector) {
  closeAllModalsWindow();
  actionsByOpenModal(modalDoneSelector);
  setTimeout(() => {
    actionsByCloseModal(modalDoneSelector);
  }, 1700);
}

function smoothScrolling() {
  const smoothLinks = document.querySelectorAll('[data-smooth-scroll="yes"]');
  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href');

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}

function pageUpOpen() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 1240) {
      document.querySelector('.pageup').classList.add('pageup_active');
    } else {
      document.querySelector('.pageup').classList.remove('pageup_active');
    }
  });
}
// const fetchData = async (url, data) => {
//   let responsive = await fetch(url, {
//     method: 'POST',
//     body: data,
//   });
//   return await responsive.text();
// };

function modalPostData() {
  const forms = document.querySelectorAll('.form');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      donePostData('#thinks');
      // let formData = new FormData(form);
      // let responsive = fetchData('mailer/smart.php', formData);
      // responsive.then((data) => console.log(data));
      // if (responsive.ok) {
      //   donePostData('#thinks');
      // } else {
      //   console.log('error');
      // }
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  $('.slaider__wrapper').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/left.png" alt="prevArrow"/></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/right.png" alt="nextArrow"/></button>',
    responsive: [
      {
        breakpoint: 930,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $('[name="tel"]').mask('+7 (999)-999-99-99');

  tabsLink('.product__link');
  tabsLink('.product__back');

  tabsCatalog(
    '.catalog__categories-item',
    '.catalog__content',
    '.catalog__categories',
    'catalog__categories-item_active',
    'catalog__content_active'
  );

  workModalWindow('[data-trigger="consulation"]', '#consultation');
  workModalWindow('[data-trigger="buy"]', '#buy');
  modalPostData();
  smoothScrolling();
  pageUpOpen();

  new WOW().init();
});
