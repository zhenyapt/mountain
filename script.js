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

let subscribeForm = document.querySelector('.subscribe-form');
subscribeForm.addEventListener('submit', validateForm);

mobileMenuIcon.addEventListener('click', function (event) {
  mobileMenuWrapper.classList.remove('hide');
  mainMenu.classList.add('nav-list--mobile');
  mobileMenuWrapper.prepend(mainMenu);
  btnCloseMenu.addEventListener('click', closeMobileMenu);
});

for (let btnOpen of btnsOpen) {
  btnOpen.addEventListener('click', function (event) {
    let btn = event.target.closest('.btn-open-modal');
    createModalcontent(btn);
    modal.classList.remove('hide');
    attachModalEvents();
  });
}

function createModalcontent(button) {
  let btnType = button.getAttribute('data-type-content');

  if (btnType == 'form') {
    modalContentHTML = `<h2 class="form__heading">Заказать консультацию</h2> <form class="form-consultation form"> 
    <label class="form-label"><input type="text" name="name" class="form-name form-input" data-required = "required" data-name = "имя" placeholder="Ваше имя"/></label> 
    <label class="form-label"><input type="tel" name="tel" class="form-tel form-input" data-required = "required" data-name = "телефон" id="form-input-tel" placeholder="Ваш телефон" /></label> 
    <button class="btn btn--dark btn-form" type="submit"> Отправить </button> </form>`;

    modalContent.innerHTML = modalContentHTML;

    handlerPopupForm();
  } else if (btnType == 'video') {
    let codeVideo = button.getAttribute('data-video-code');
    modalContentHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${codeVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    modalContent.innerHTML = modalContentHTML;
  }
}

function attachModalEvents() {
  modal.addEventListener('click', handleOutside);
  btnClose.addEventListener('click', closeModal);
}

function handleOutside(event) {
  const isClickOutside = event.target.closest('.popup-wrapper');
  if (!isClickOutside) {
    closeModal();
  }
}

function closeModal() {
  modal.classList.add('hide');
  modal.removeEventListener('click', handleOutside);
  btnClose.removeEventListener('click', closeModal);
}

function closeMobileMenu() {
  mobileMenuWrapper.classList.add('hide');
  btnCloseMenu.removeEventListener('click', btnCloseMenu.closeMobileMenu);
}

function handlerPopupForm() {
  //получение созданной попап формы
  let currentPopupForm = document.querySelector('.popup .form');
  let telephoneCurentPopupForm = currentPopupForm.querySelector('.form-tel');
  //добавление маски телефону
  if (telephoneCurentPopupForm) {
    setMaskTel(telephoneCurentPopupForm);
  }
  currentPopupForm.addEventListener('submit', validateForm);
}

function validateForm(event) {
  event.preventDefault();
  let formIsValid = true;
  let currentForm = event.target;
  let messagesError = currentForm.querySelectorAll('.form-error-message');

  if (messagesError) {
    messagesError.forEach((message) => {
      message.remove();
    });
  }

  let formElements = Array.from(currentForm);

  formElements.forEach((element) => {
    if (element.dataset.required && !element.value) {
      formIsValid = false;
      element.classList.add('form-input--error');
      let message;
      message = document.createElement('span');
      message.textContent = `Поле ${element.dataset.name} обязательно`;
      message.classList.add('form-error-message');
      element.closest('.form-label').insertBefore(message, element);
    }
    if (
      element.dataset.required &&
      element.value &&
      element.classList.contains('form-input--error')
    ) {
      element.classList.remove('form-input--error');
    }
  });

  if (formIsValid) {
    //submit form - нужна отправка на сервер и проверка ответа от сервера

    if (currentForm.closest('.popup')) {
      modalContentHTML = `<h2 class="form__heading">Форма успешно отправлена</h2> <p>Мы перезвоним Вам в ближайщее время</p>`;
      modalContent.innerHTML = modalContentHTML;
    }
  }
}

function setMaskTel(telephoneCurentPopupForm) {
  let maskOptions = {
    mask: '+{7}(000)000-00-00',
  };
  let mask = IMask(telephoneCurentPopupForm, maskOptions);
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
    let srcImgFull;
    if (event.target.classList.contains('photo-gallery__item')) {
      srcImgFull = event.target.firstElementChild.src;
    } else if (event.target.classList.contains('photo-gallery__img')) {
      srcImgFull = event.target.src;
    } else {
      console.log('error');
    }

    fullImage.setAttribute('src', srcImgFull);
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

let cookie = document.querySelector('.cookie');
let aboutProject = document.querySelector('.about-project');
let btnsOk = document.querySelectorAll('.btn-ok');

if (window.localStorage.getItem('cookie') != 'yes') {
  cookie.classList.remove('hide');
}

if (window.localStorage.getItem('cookie') == 'yes') {
  cookie.classList.remove('cookie-animation');
  cookie.classList.add('hide');
}

if (window.localStorage.getItem('about-project') != 'yes') {
  aboutProject.classList.remove('hide');
}

if (window.localStorage.getItem('about-project') == 'yes') {
  aboutProject.classList.add('hide');
}

for (let btnOk of btnsOk) {
  btnOk.addEventListener('click', closeInfoBar);
}

function closeInfoBar(event) {
  let parent = event.target.closest('.info-bar');
  parent.classList.add('hide');
  if (parent.classList.contains('cookie')) {
    window.localStorage.setItem('cookie', 'yes');
  } else if (parent.classList.contains('about-project')) {
    window.localStorage.setItem('about-project', 'yes');
  }
}
