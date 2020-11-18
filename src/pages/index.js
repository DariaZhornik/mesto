import '../pages/index.css';
import Card from '../scripts/Card.js'
import FormValidator from '../scripts/FormValidator.js' 
import PopupWithForm from '../scripts/PopupWithForm.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import Section from '../scripts/Section.js'
import UserInfo from '../scripts/UserInfo.js'
import PopupConfirmation from '../scripts/PopupConfirmation';
import {ownerInfo} from '../utils/config.js'
import { validationParams } from '../utils/constants.js'
import { popupAddForm } from '../utils/constants.js'
import { popupEditForm } from '../utils/constants.js'
import { popupChangeForm } from '../utils/constants.js'
import { elementSelector } from '../utils/constants.js'
import { addBtn } from '../utils/constants.js'
import { editBtn } from '../utils/constants.js'
import { profilePhoto } from '../utils/constants.js'
import { changeButtonValue, setSubmitCallback } from '../utils/utils.js'
import {api} from '../utils/constants.js'

profilePhoto.addEventListener('click', () => openEditPhotoPopup());
function openEditPhotoPopup(){
  editPhotoPopup.open()
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


// ============================================================= рендер карточек

api.getInitialCards()
  .then((result) => { 
  result.forEach(item => {
    const card = createCard(item);
    cardList.addItem(card.getElement())
  })
})
.catch(() => console.error('Ошибка'));  


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
    handleDeleteCard,
    removeLikeFunction, 
    addLikeFunction,
    elementSelector);
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
    changeButtonValue('.popup__content_add', 'Сохранение...')
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
    changeButtonValue('.popup__content_edit', 'Сохранение...')
    api.changeUserInfo(item)
      .then(result =>
    userInfo.setUserInfo(result))
        .catch(() => console.error('Ошибка'))
        .finally(() => changeButtonValue('.popup__content_edit', 'Сохранить'));
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

function handleDeleteCard() {
  this._element.querySelector('.element__delete').addEventListener('click', ()=>
  deletePopup.open(this._cardId, this._element));
}

// open(id, card){
//   super.open();
//   this._id = id;
//   this._card = card; 
// }

// _deleteHandler(){
//   this._element.remove();
//   this._element = null;
// }

// ===================================================== попап редактирования аватара

const editPhotoPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-photo', 
  formSelector: '.popup__content_avatar', 
  handleFormSubmit: (object) => {
   changeButtonValue('.popup__content_avatar', 'Сохранение...')
   api.changeAvatar(object.avatar)
     .then(result => 
      userInfo.setUserInfo(result))
      .catch(() => console.error('Ошибка'))
      .finally(() => changeButtonValue('.popup__content_avatar', 'Сохранить'));
  }});

editPhotoPopup.setEventListeners();

// ========= валидация ================================ //

const formEditValidator = new FormValidator(validationParams, popupAddForm);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(validationParams, popupEditForm);
formAddValidator.enableValidation();

const formChangeValidator = new FormValidator(validationParams, popupChangeForm);
formChangeValidator.enableValidation();