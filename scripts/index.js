const editPopup = document.querySelector('.popup')
const addPopup = document.querySelector('.popup-add')
const addBtn = document.querySelector('.profile__add-btn')
const editBtn = document.querySelector('.profile__edit-btn')
const closeBtn = document.querySelector('.popup__close')
const addPopupClose = addPopup.querySelector('.popup__close')
const createBtn = addPopup.querySelector('.popup__save')
const cardName = document.querySelector('.popup__text_title')
const cardLink = document.querySelector('.popup__text_link')
const popupForm = editPopup.querySelector('.popup__container')
const popupName = popupForm.querySelector('.popup__text_name')
const popupJob = popupForm.querySelector('.popup__text_job')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const templateElement = document.querySelector(".element-template").content;
const photoPopup = document.querySelector('.popup_type_photo');
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

function popupToggle (popup) {
  popup.classList.toggle('popup_is-opened')
}

function formSubmitHandler (evt) {
  evt.preventDefault() 
  profileName.textContent = popupName.value
  profileJob.textContent = popupJob.value
  popupToggle(editPopup) 
}     

function formInfoFill (evt) {
  popupName.value = profileName.textContent
  popupJob.value = profileJob.textContent
  popupToggle(editPopup) 
}  

closeBtn.addEventListener('click', function () {
  const editPopup = document.querySelector('.popup-edit');
  popupToggle(editPopup);
})
addBtn.addEventListener('click', function () {
  const addPopup = document.querySelector('.popup-add');
  popupToggle(addPopup);
})
addPopupClose.addEventListener('click', function () {
  const addPopup = document.querySelector('.popup-add');
  popupToggle(addPopup);
})
createBtn.addEventListener('click', createCard)
editBtn.addEventListener('click', formInfoFill)
popupForm.addEventListener('submit', formSubmitHandler)

function render() {
  initialCards.forEach(card => renderItem(card));
}

function renderItem(card) {
  const nameCard = card.name;
  const linkCard = card.link;
  addCard(nameCard, linkCard);
}

function addCard(name, link) {
  const cardElement = templateElement.cloneNode(true);
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__image").alt = name;
  cardElement.querySelector(".element__like").addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  })
  cardElement.querySelector(".element__delete").addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  })
  photoPopup.querySelector(".popup_type_photo__image").src = link;
  photoPopup.querySelector(".popup_type_photo__title").textContent = name;
  photoPopup.querySelector(".popup_type_photo__image").alt = name;
  cardElement.querySelector(".element__image").addEventListener('click', function () {
    const photoPopup = document.querySelector('.popup_type_photo');
    popupToggle(photoPopup);
  })
  photoPopup.querySelector('.popup_type_photo__close').addEventListener('click', function () {
    const photoPopup = document.querySelector('.popup_type_photo');
    popupToggle(photoPopup);
  })
  prependCard(cardElement);
}

function prependCard (card) {
  elements.prepend(card)
}

render()

function createCard () {
  event.preventDefault()
  addCard(cardName.value, cardLink.value) 
  popupToggle(addPopup);
}