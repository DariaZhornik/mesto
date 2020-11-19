import '../pages/index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js' 
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupConfirmation from '../components/PopupConfirmation.js'
import {addPopup, inputSelector, elementsSelector, photoPopupSelector, imageSelector, figCaptionSelector, addPopupFormSelector, addPopupSelector, editPopupFormSelector, editPopupSelector, editPhotoPopupFormSelector, editPhotoPopupSelector, deletePopupSelector, submitButton, popupTextJob, popupTextName, userName, userDescription, userAvatar } from '../utils/constants.js'
import {avatarPopup} from '../utils/constants.js'
import {editPopup} from '../utils/constants.js'
import {ownerInfo} from '../utils/config.js'
import { validationParams } from '../utils/constants.js'
import { popupAddForm } from '../utils/constants.js'
import { popupEditForm } from '../utils/constants.js'
import { popupChangeForm } from '../utils/constants.js'
import { elementSelector } from '../utils/constants.js'
import { addBtn } from '../utils/constants.js'
import { editBtn } from '../utils/constants.js'
import { profilePhoto } from '../utils/constants.js'
import { changeButtonValue, setSubmitCallback, deleteCardCallback } from '../utils/utils.js'
import {api} from '../utils/constants.js'

Promise.all([
  api.getInitialCards(),
  api.getUserInfo(),
])
  .then(([initialCards, userData]) => {
    initialCards.forEach(item => {
    const card = createCard(item, userData);
    cardList.addItem(card.getElement())
    });
    ownerInfo.id = userData._id; 
    userInfo.setUserInfo(userData)})
  .catch(() => console.error('Ошибка'));


const photoInputs = avatarPopup.querySelectorAll(inputSelector);
profilePhoto.addEventListener('click', () => openEditPhotoPopup());
function openEditPhotoPopup(){
  photoInputs.forEach(input => {
    formChangeValidator.hideInputError(input)
  })
  editPhotoPopup.open();
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

function handleCardClick(name, link){
  imagePopup.open(name, link);
}

const createCard = (object, userData)  => {
  const card = new Card(
    object.name,
    object.link,
    object._id,
    object.owner._id,
    object.likes,
    userData._id, 
    handleCardClick, 
    deleteCardCallback,
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
}, elementsSelector)

const imagePopup = new PopupWithImage({
  popupSelector: photoPopupSelector,
  imageSelector: imageSelector,
  figCaptionSelector: figCaptionSelector
})
imagePopup.setEventListeners();

// ================================================================ добавление карточек


const popupWithFormAdd = new PopupWithForm({
  popupSelector: addPopupSelector,
  formSelector: addPopupFormSelector,
  handleFormSubmit: (item) => {
    changeButtonValue(addPopupFormSelector, 'Сохранение...')
    Promise.all([
      api.addNewCard(item["place-name"], item["place-link"]),
      api.getUserInfo(),
    ])
      .then(([newCard, userData]) => {
        cardList.addItem(createCard(newCard, userData).getElement(), true);
        })
      .catch(() => console.error('Ошибка'))
      .finally(() => changeButtonValue(addPopupFormSelector, 'Создать'));
  }
})


const addInputs = addPopup.querySelectorAll(inputSelector);


popupWithFormAdd.setEventListeners();

addBtn.addEventListener('click', () => {
  addInputs.forEach(input => {
    formAddValidator.hideInputError(input)
  })
  popupWithFormAdd.open();
  submitButton.setAttribute("disabled", true);
});

// ================================================================== форма для редактирования информации профиля

const userInfoForm = new PopupWithForm({
  popupSelector: editPopupSelector,
  formSelector: editPopupFormSelector,
  handleFormSubmit: (item) => {
    changeButtonValue(editPopupFormSelector, 'Сохранение...')
    api.changeUserInfo(item)
      .then(result =>
    userInfo.setUserInfo(result))
        .catch(() => console.error('Ошибка'))
        .finally(() => changeButtonValue(editPopupFormSelector, 'Сохранить'));
  }
})

const userInfo = new UserInfo({
  name: userName,
  description: userDescription,
  avatar: userAvatar
})


const userInfoInputs = editPopup.querySelectorAll(inputSelector)
userInfoForm.setEventListeners();
editBtn.addEventListener('click', () => {
  userInfoInputs.forEach(input => {
    formEditValidator.hideInputError(input)
  })
  userInfoForm.open();
  popupTextName.value = userInfo.getUserInfo().name;
  popupTextJob.value = userInfo.getUserInfo().description;
})

// ===================================================== попап удаления 

export const deletePopup = new PopupConfirmation(deletePopupSelector);
deletePopup.setEventListeners();

// ===================================================== попап редактирования аватара

const editPhotoPopup = new PopupWithForm({
  popupSelector: editPhotoPopupSelector, 
  formSelector: editPhotoPopupFormSelector, 
  handleFormSubmit: (object) => {
   changeButtonValue(editPhotoPopupFormSelector, 'Сохранение...')
   api.changeAvatar(object.avatar)
     .then(result => 
      userInfo.setUserInfo(result))
      .catch(() => console.error('Ошибка'))
      .finally(() => changeButtonValue(editPhotoPopupFormSelector, 'Сохранить'));
  }});

editPhotoPopup.setEventListeners();

// ========= валидация ================================ //

const formEditValidator = new FormValidator(validationParams, popupEditForm);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(validationParams, popupAddForm);
formAddValidator.enableValidation();

const formChangeValidator = new FormValidator(validationParams, popupChangeForm);
formChangeValidator.enableValidation();