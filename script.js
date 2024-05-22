'use strict';

let btnsOpen = document.querySelectorAll('.btn-open-modal');
let btnClose = document.querySelector('.btn-close-modal');
let modal = document.querySelector('.popup');
let modalContent = document.querySelector('.popup-content');
let modalContentHTML;

let mobileMenuIcon = document.querySelector('.mobile-menu-icon');
let mainMenu = document.querySelector('.nav-list');
let mobileMenu = document.querySelector('.mobile-menu');
let mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
let btnCloseMenu = document.querySelector('.btn-close-menu');

mobileMenuIcon.addEventListener('click', function (event) {
  mobileMenuWrapper.classList.remove('hide');
  mainMenu.classList.add('nav-list--mobile');
  mobileMenuWrapper.prepend(mainMenu);
  btnCloseMenu.addEventListener('click', closeMobileMenu);
});

for (let btnOpen of btnsOpen) {
  btnOpen.addEventListener('click', function (event) {
    let btn = event.target.closest('.btn-open-modal');
    console.log(btn);
    createModalcontent(btn);
    modal.classList.toggle('hide');
    attachModalEvents();
  });
}

function createModalcontent(btn) {
  let btnType = btn.getAttribute('data-type-content');
  if (btnType == 'form') {
    console.log('form');
    modalContentHTML = `<h2 class="form__heading">Заказать консультацию</h2> <form class="form-consultation form"> <input type="text" class="form-name form-input" placeholder="Ваше имя"/> <input type="tel" class="form-tel form-input" placeholder="Ваш телефон" /> <button class="btn btn--dark btn-form-consultation" type="button"> Отправить </button> </form>`;
    modalContent.innerHTML = modalContentHTML;
  }

  if (btnType == 'video') {
    let codeVideo = btn.getAttribute('data-video-code');
    modalContentHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${codeVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    modalContent.innerHTML = modalContentHTML;
  }
}

function attachModalEvents() {
  modal.addEventListener('click', handleOutside);
  btnClose.addEventListener('click', closeModal);
}

function handleOutside(event) {
  const isClickOutside = !!event.target.closest('.popup-wrapper');
  if (!isClickOutside) {
    closeModal();
  }
}

function closeModal() {
  modal.classList.toggle('hide');
  modal.removeEventListener('click', handleOutside);
  btnClose.removeEventListener('click', closeModal);
}

function closeMobileMenu() {
  mobileMenuWrapper.classList.toggle('hide');
  btnCloseMenu.removeEventListener('click', btnCloseMenu.closeMobileMenu);
}

const swiperDirection = new Swiper('.popular-direction-slider', {
  fade: true,
  breakpoints: {
    320: {
      slidesPerView: 1.2,
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

if (window.innerWidth <= 1024) {
  let blogSlider = document.querySelector('.blog-slider');
  blogSlider.classList.add('swiper');

  let blogWripper = document.querySelector('.blog-wrapper');
  blogWripper.classList.add('swiper-wrapper');

  let blogSliderItems = document.querySelectorAll('.blog-item');

  for (let blogSliderItem of blogSliderItems) {
    blogSliderItem.classList.add('swiper-slide');
  }

  const swiperBlog = new Swiper('.blog-slider', {
    fade: true,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 5,
      },
      660: {
        slidesPerView: 2.5,
        spaceBetween: 5,
      },
      990: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });
}

let photos = document.querySelectorAll('.photo-gallery__item');
let fullImage = document.createElement('img');

let popupPhoto = document.querySelector('.popup-photo');
for (let photo of photos) {
  photo.addEventListener('click', function (event) {
    console.log(event.target.src);

    fullImage.setAttribute('src', event.target.src);
    fullImage.classList.add('photo-gallery__img-full');
    popupPhoto.classList.toggle('hide');
    popupPhoto.prepend(fullImage);
    popupPhoto.addEventListener('click', closePopupPhoto);
  });
}

function closePopupPhoto(event) {
  console.log('close');
  if (!event.target.classList.contains('photo-gallery__img-full')) {
    fullImage.remove();
    popupPhoto.classList.toggle('hide');
    popupPhoto.removeEventListener('click', closePopupPhoto);
  }
}

if (window.innerWidth <= 1024) {
  let photoSlider = document.querySelector('.photo-gallery');
  photoSlider.classList.add('swiper');

  let photoWripper = document.querySelector('.photo-gallery-wrapper');
  photoWripper.classList.add('swiper-wrapper');

  let photoSliderItems = document.querySelectorAll('.photo-gallery__item');

  for (let photoSliderItem of photoSliderItems) {
    photoSliderItem.classList.add('swiper-slide');
  }

  const swiperBlog = new Swiper('.photo-gallery', {
    fade: true,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 5,
      },
      660: {
        slidesPerView: 2.5,
        spaceBetween: 5,
      },
      990: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });
}
