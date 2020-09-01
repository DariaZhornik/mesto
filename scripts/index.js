const popup = document.querySelector('.popup')
const editBtn = document.querySelector('.profile__edit-btn')
const addBtn = document.querySelector('.profile__add-btn')
const closeBtn = document.querySelector('.popup__close')
const saveBtn = document.querySelector('.popup__save')

const popupToggle = function ()  {
    popup.classList.toggle('popup_is-opened')
}

const popupOverlayClose = (event) => {
  console.log({
    target: event.target,
    currentTarget: event.currentTarget,
  })
  if (event.target !== event.currentTarget) {
    return
  }

  popupToggle(event)
}

editBtn.addEventListener('click', popupToggle)
closeBtn.addEventListener('click', popupToggle)
saveBtn.addEventListener('click', popupToggle)
popup.addEventListener('click', popupOverlayClose)

const popupForm = popup.querySelector('.popup__container')
const popupName = popupForm.querySelector('.popup__name')
const popupJob = popupForm.querySelector('.popup__job')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')

function formSubmitHandler (evt) {
    evt.preventDefault() 
    profileName.textContent = popupName.value
    profileJob.textContent = popupJob.value
}

popupForm.addEventListener('submit', formSubmitHandler)

