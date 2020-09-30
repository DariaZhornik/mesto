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
const photoPopup = document.querySelector('.popup_type_photo');
const photoPopupImage = photoPopup.querySelector(".popup__image_type_photo")
const photoPopupTitle = photoPopup.querySelector(".popup__title_type_photo")
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

function openPopup (popup) {
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

function render() {
  initialCards.forEach(card => renderItem(card));
}

function getCardElement(name, link) {
  const cardElement = templateElement.cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  cardElement.querySelector(".element__title").textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  cardElement.querySelector(".element__like").addEventListener('click', handleLikeIcon)
  cardElement.querySelector(".element__delete").addEventListener('click', handleDeleteCard);
  elementImage.addEventListener('click', () => {
    openPhotoPopup(name, link);
  });
  return cardElement;
}

function handleDeleteCard (evt) {
  evt.target.parentElement.remove();
}

function handleLikeIcon (evt) {
  evt.target.classList.toggle('element__like_active');
}

function openPhotoPopup (name, link) {
  openPopup(photoPopup);
  photoPopupImage.src = link;
  photoPopupImage.alt = name;
  photoPopupTitle.textContent = name; 
}

function renderItem(card) {
  const nameCard = card.name;
  const linkCard = card.link;
  const getCard = getCardElement(nameCard, linkCard);
  elementsContainer.prepend(getCard);
}

render();

function createCard () {
  event.preventDefault();
  const getNewCard = getCardElement(cardName.value, cardLink.value); 
  elementsContainer.prepend(getNewCard);
  closePopup(addPopup);
}

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
addPopup.addEventListener('submit', createCard);
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