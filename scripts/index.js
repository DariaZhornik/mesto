const popup = document.querySelector('.popup')
const addPopup = document.querySelector('.popup-add')
const addBtn = document.querySelector('.profile__add-btn')
const editBtn = document.querySelector('.profile__edit-btn')
const closeBtn = document.querySelector('.popup__close')
const addPopupClose = addPopup.querySelector('.popup__close')
const createBtn = addPopup.querySelector('.popup__save')
const cardName = document.querySelector('.popup__text_title')
const cardLink = document.querySelector('.popup__text_link')
const popupForm = popup.querySelector('.popup__container')
const popupName = popupForm.querySelector('.popup__text_name')
const popupJob = popupForm.querySelector('.popup__text_job')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const templateElement = document.querySelector(".element-template").content;
const elements = document.querySelector(".elements");
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

function render() {
  initialCards.forEach(renderItem);
}

function renderItem(card, index) {
  const cardElement = templateElement.cloneNode(true);
  cardElement.querySelector(".element__title").textContent = card.name;
  cardElement.querySelector(".element__image").src = card.link;
  cardElement.querySelector(".element__image").alt = card.name;
  cardElement.querySelector(".element__like").addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  })
  cardElement.querySelector(".element__delete").addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  })
  const photoPopup = document.querySelector('.popup_type_photo');
  photoPopup.querySelector(".popup_type_photo__image").src = card.link;
  photoPopup.querySelector(".popup_type_photo__title").textContent = card.name;
  photoPopup.querySelector(".popup_type_photo__image").alt = card.name;
  cardElement.querySelector(".element__image").addEventListener('click', photoPopupToggle);
  photoPopup.querySelector('.popup_type_photo__close').addEventListener('click', photoPopupToggle);
  elements.appendChild(cardElement);
}

render()
function createCard (evt) {
  evt.preventDefault() 
  const cardElement = templateElement.cloneNode(true);
  cardElement.querySelector(".element__title").textContent = cardName.value;
  cardElement.querySelector(".element__image").src = cardLink.value;
  cardElement.querySelector(".element__image").alt = cardName.value;
  cardElement.querySelector(".element__like").addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  })
  cardElement.querySelector(".element__delete").addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  })
  const photoPopup = document.querySelector('.popup_type_photo');
  photoPopup.querySelector(".popup_type_photo__image").src = cardLink.value;
  photoPopup.querySelector(".popup_type_photo__title").textContent = cardName.value;
  photoPopup.querySelector(".popup_type_photo__image").alt = cardName.value;
  cardElement.querySelector(".element__image").addEventListener('click', photoPopupToggle);
  photoPopup.querySelector('.popup_type_photo__close').addEventListener('click', photoPopupToggle);
  elements.prepend(cardElement);  
  addPopupToggle();
}

function popupToggle () {
  popup.classList.toggle('popup_is-opened')
}

function addPopupToggle () {
  addPopup.classList.toggle('popup_is-opened')
}

function photoPopupToggle () {
  const photoPopup = document.querySelector('.popup_type_photo');
  photoPopup.classList.toggle('popup_is-opened')
}

function formSubmitHandler (evt) {
  evt.preventDefault() 
  profileName.textContent = popupName.value
  profileJob.textContent = popupJob.value
  popupToggle() 
}     

function formInfoFill (evt) {
  evt.preventDefault() 
  popupName.value = profileName.textContent
  popupJob.value = profileJob.textContent
  popupToggle() 
}  

closeBtn.addEventListener('click', popupToggle)
addBtn.addEventListener('click', addPopupToggle)
addPopupClose.addEventListener('click', addPopupToggle)
createBtn.addEventListener('click', createCard)
editBtn.addEventListener('click', formInfoFill)
popupForm.addEventListener('submit', formSubmitHandler)