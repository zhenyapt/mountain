'use strict';

// let xhr = new XMLHttpRequest();

// xhr.open('GET', 'https://goweather.herokuapp.com/weather/Moscow');
// xhr.send();

// xhr.addEventListener('load', function () {
//   console.log(`Загружено: ${xhr.status} ${xhr.response}`);
// });

// console.log(23);

let btnsOpen = document.querySelectorAll('.btn-open-modal');
let modal = document.querySelector('.popup');
let btnClose = document.querySelector('.btn-close');
let modalContent = document.querySelector('.popup-content');
let modalContentHTML;
let btn;

let mobileMenuIcon = document.querySelector('.mobile-menu-icon');
let mainMenu = document.querySelector('.nav-list');
let mobileMenu = document.querySelector('.mobile-menu');
let mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');

mobileMenuIcon.addEventListener('click', function (event) {
  console.log(mainMenu);
  mobileMenuWrapper.classList.remove('hide');
  mainMenu.classList.add('nav-list--mobile');
  mobileMenuWrapper.prepend(mainMenu);
});

for (let btnOpen of btnsOpen) {
  btnOpen.addEventListener('click', function (event) {
    btn = event.target.closest('.btn-open-modal');
    console.log(btn);
    createModalcontent(btn);
    modal.classList.toggle('hide');
    attachModalEvents();
  });
}

function createModalcontent(btn) {
  if (btn.getAttribute('data-type-content') == 'form') {
    console.log('form');
    modalContentHTML =
      '<form class="form-consultation form"> <h2 class="form__heading">Заказать консультацию</h2> <input type="text" class="form-name form-input" placeholder="Ваше имя"/> <input type="tel" class="form-tel form-input" placeholder="Ваш телефон" /> <button class="btn btn-dark btn-form-consultation" type="button"> Отправить </button> </form>';
    modalContent.innerHTML = modalContentHTML;
  }

  if (btn.getAttribute('data-type-content') == 'video') {
    let codeVideo = btn.getAttribute('data-video-code');
    modalContentHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${codeVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    modalContent.innerHTML = modalContentHTML;
  }
}

function attachModalEvents() {
  modal.addEventListener('click', handleOutside);
}

function handleOutside(event) {
  const isClickOutside = !!event.target.closest('.popup-content');
  if (!isClickOutside) {
    closeModal();
  }
}

function closeModal() {
  modal.classList.toggle('hide');
  modal.removeEventListener('click', handleOutside);
}

const swiper = new Swiper('.swiper', {
  breakpoints: {
    460: {
      slidesPerView: 1.25,
      spaceBetween: 5,
    },
    560: {
      slidesPerView: 2.5,
      spaceBetween: 5,
    },
    990: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
