const editPopup = document.querySelector('.popup_type_edit')
const addPopup = document.querySelector('.popup_type_add')
const addBtn = document.querySelector('.profile__add-btn')
const editBtn = document.querySelector('.profile__edit-btn')
const closeBtn = document.querySelector('.popup__close')
const addPopupClose = addPopup.querySelector('.popup__close')
const createBtn = addPopup.querySelector('.popup__save')
const cardName = document.querySelector('.popup__text_title')
const cardLink = document.querySelector('.popup__text_link')
const popupEditForm = editPopup.querySelector('.popup__container')
const popupName = popupEditForm.querySelector('.popup__text_name')
const popupJob = popupEditForm.querySelector('.popup__text_job')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const templateElement = document.querySelector(".element-template").content;
export const photoPopup = document.querySelector('.popup_type_photo');
export const photoPopupImage = photoPopup.querySelector(".popup__image_type_photo")
export const photoPopupTitle = photoPopup.querySelector(".popup__title_type_photo")
const photoPopupClose =   photoPopup.querySelector('.popup__close_type_photo')
const elementsContainer = document.querySelector(".elements");
const ESC_KEYCODE = 27;

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// ======== функции закрытия и открытия попапов ========= //

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscDown);
}

export function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscDown);
}

function closePopupOverlay (popup) {
  if (event.target !== event.currentTarget) {
    return
  }
  closePopup(popup);
}

const handleEscDown = (evt) => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.keyCode === ESC_KEYCODE) {
  activePopup.classList.remove('popup_is-opened');
  }
}; 

// ===== функции для окна редактирования профиля  ====== //

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(editPopup);
}     

function fillFormInfo (evt) {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  openPopup(editPopup); 
}  

// ========= создание галереи карточек ========== //

import Card from './Card.js'

const config = {
  itemTemplate: ".element-template",
  list: document.querySelector(".elements"),
  formSelector: document.querySelector(".popup__content"),
  form: document.querySelector(".popup__content_add"),
  formObject: {
    name: document.querySelector(".popup__text_title").value,
    link: document.querySelector(".popup__text_link").value
  }
}

const prependCard = (element) =>{
  config.list.prepend(element);
}

initialCards.forEach((item)=>{
  const card = new Card(item, config.itemTemplate, prependCard);
  const element = card.getElement();
  config.list.append(element);
})  


const addCard = (event)=>{
  event.preventDefault();
  const card = new Card(config.formObject, config.itemTemplate, prependCard);
  const element = card.getElement();
  prependCard(element);
}

config.form.addEventListener('submit', addCard);

// ========= валидация ================================ //

import FormValidator from './FormValidator.js' 

const params = {
  formSelector: '.popup__content_edit',
  formElement: document.querySelector('.popup__content_edit'),
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

const paramsAdd = {
  formSelector: '.popup__content_add',
  formElement: document.querySelector('.popup__content_add'),
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

const formEditValidator = new FormValidator(params.formSelector, params);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(paramsAdd.formSelector, paramsAdd);
formAddValidator.enableValidation();

// ========= добавление обработчиков событий ========== //

closeBtn.addEventListener('click', function () {
  closePopup(editPopup);
});
addBtn.addEventListener('click', function () {
  openPopup(addPopup);
});
addPopupClose.addEventListener('click', function () {
  closePopup(addPopup);
});
editBtn.addEventListener('click', fillFormInfo);
popupEditForm.addEventListener('submit', formSubmitHandler);
photoPopupClose.addEventListener('click', function () {
  closePopup(photoPopup);
});
editPopup.addEventListener('click', function () {
  closePopupOverlay(editPopup);
});
addPopup.addEventListener('click', function () {
  closePopupOverlay(addPopup);
});
photoPopup.addEventListener('click', function () {
  closePopupOverlay(photoPopup);
});