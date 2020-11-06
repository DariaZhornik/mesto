import '../pages/index.css';
import Card from './Card.js'
import FormValidator from './FormValidator.js' 
import Popup from './Popup.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'
import Section from './Section.js'
import UserInfo from './UserInfo.js'
export const editPopup = document.querySelector('.popup_type_edit')
export const addPopup = document.querySelector('.popup_type_add')
export const addBtn = document.querySelector('.profile__add-btn')
export const editBtn = document.querySelector('.profile__edit-btn')
export const addPopupClose = addPopup.querySelector('.popup__close')
export const photoPopup = document.querySelector('.popup_type_photo');
export const photoPopupImage = photoPopup.querySelector(".popup__image_type_photo")
export const photoPopupTitle = photoPopup.querySelector(".popup__title_type_photo")

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

// ============================================================= рендер карточек
function handleCardClick(name, link){
  imagePopup.open(name, link);
}
const createCard = (name, link) => {
  const card = new Card(name, link, handleCardClick, '.element-template');
  return card;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item.name, item.link).getElement());
  } 
}, '.elements')
cardList.renderItems();


const imagePopup = new PopupWithImage({
  popupSelector: ".popup_type_photo",
  imageSelector: ".popup__image_type_photo",
  figCaptionSelector: ".popup__title_type_photo"
})
imagePopup.setEventListeners();

// ================================================================ добавление карточек

const popupWithFormAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  formSelector: '.popup__content_add',
  handleFormSubmit: (item) => {
    cardList.addItem(createCard(item["place-name"], item["place-link"]).getElement(), true);
  }
})
popupWithFormAdd.setEventListeners();
addBtn.addEventListener('click', () => {
  popupWithFormAdd.open();
  document.querySelector('.popup__submit').setAttribute("disabled", true);
});

// ================================================================== форма для редактирования информации профиля

const userInfoForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  formSelector: '.popup__content_edit',
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item);
  }
})

const userInfo = new UserInfo({
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__subtitle')
})

userInfoForm.setEventListeners();
editBtn.addEventListener('click', () => {
  userInfoForm.open();
  document.querySelector('.popup__text_name').value = userInfo.getUserInfo().name;
  document.querySelector('.popup__text_job').value = userInfo.getUserInfo().description;
})

// ========= валидация ================================ //

const params = {
  formSelector: '.popup__content_edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

const formEditValidator = new FormValidator(params, document.querySelector('.popup__content_add'));
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(params, document.querySelector('.popup__content_edit'));
formAddValidator.enableValidation();