import '../pages/index.css';
import Card from './Card.js'
import FormValidator from './FormValidator.js' 
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'
import Section from './Section.js'
import UserInfo from './UserInfo.js'
import { Api, ownerInfo } from './Api.js'
import PopupConfirmation from './PopupConfirmation';
export const editPopup = document.querySelector('.popup_type_edit')
export const addPopup = document.querySelector('.popup_type_add')
export const addBtn = document.querySelector('.profile__add-btn')
export const editBtn = document.querySelector('.profile__edit-btn')
export const addPopupClose = addPopup.querySelector('.popup__close')
export const photoPopup = document.querySelector('.popup_type_photo');
export const photoPopupImage = photoPopup.querySelector(".popup__image_type_photo")
export const photoPopupTitle = photoPopup.querySelector(".popup__title_type_photo")
const profilePhoto = document.querySelector('.profile__image-wrap')


profilePhoto.addEventListener('click', () => openEditPhotoPopup());

function openEditPhotoPopup(){
  editPhotoPopup.open()
}

function setSubmitCallback(id, element){
  api.deleteCard(id)
      .then(() => {
          element.remove();
          this.close();
      })
      .catch(() => console.error('Ошибка'));
}

function removeLikeFunction(id){
  api.removeLike(id)
    .then((data) => {
      this.switchLikes(data.likes.length)
    })
    .catch(() => console.error('Ошибка'));
}

function addLikeFunction(id){
  api.addLike(id)
  .then((data) => {
    this.switchLikes(data.likes.length)
  })
  .catch(() => console.error('Ошибка'));    
}

export function changeButtonValue(formSelector, text){
  document.querySelector(formSelector).querySelector('.popup__save').textContent = text;
}


// ============================================================ api

const api = new Api(ownerInfo);


// ============================================================= рендер карточек

api.getInitialCards()
  .then((result) => { 
  result.forEach(item => {
    const card = createCard(item);
    cardList.addItem(card.getElement());
  })
  .catch(() => console.error('Ошибка'));  
})


function handleCardClick(name, link){
  imagePopup.open(name, link);
}


const createCard = (object)  => {
  const card = new Card(
    object.name,
    object.link,
    object._id,
    object.owner._id,
    ownerInfo.id, 
    object.likes,
    handleCardClick, 
    removeLikeFunction, 
    addLikeFunction,
    '.element-template');
  return card;
}

const cardList = new Section({
  items: [],
  renderer: (item) => {
    cardList.addItem(createCard(item).getElement());
  } 
}, '.elements')

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
    api.addNewCard(item["place-name"], item["place-link"])
      .then(result => {
        cardList.addItem(createCard(result).getElement(), true);
      })
      .catch(() => console.error('Ошибка'))
      .finally(() => changeButtonValue('.popup__content_add', 'Создать'));
  }
})
popupWithFormAdd.setEventListeners();
addBtn.addEventListener('click', () => {
  popupWithFormAdd.open();
  document.querySelector('.popup__submit').setAttribute("disabled", true);
});

// ================================================================== форма для редактирования информации профиля

api.getUserInfo()
  .then(result => {  
    userInfo.setUserInfo(result);
  })
  .catch(() => console.error('Ошибка'));


const userInfoForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  formSelector: '.popup__content_edit',
  handleFormSubmit: (item) => {
    api.changeUserInfo(item)
      .then(result =>
    userInfo.setUserInfo(result))
        .finally(() => changeButtonValue('.popup__content_edit', 'Сохранить'))
        .catch(() => console.error('Ошибка'));
  }
})

const userInfo = new UserInfo({
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__subtitle'),
  avatar: document.querySelector('.profile__image')
})

userInfoForm.setEventListeners();
editBtn.addEventListener('click', () => {
  userInfoForm.open();
  document.querySelector('.popup__text_name').value = userInfo.getUserInfo().name;
  document.querySelector('.popup__text_job').value = userInfo.getUserInfo().description;
})

// ===================================================== попап удаления 

export const deletePopup = new PopupConfirmation('.popup_type_delete', setSubmitCallback);

deletePopup.setEventListeners();

// ===================================================== попап редактирования аватара

const editPhotoPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-photo', 
  formSelector: '.popup__content_avatar', 
  handleFormSubmit: (object) => {
   api.changeAvatar(object.avatar)
     .then(result => 
      userInfo.setUserInfo(result))
      .catch(() => console.error('Ошибка'))
      .finally(() => changeButtonValue('.popup__content_avatar', 'Сохранить'));
  }});

editPhotoPopup.setEventListeners();

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