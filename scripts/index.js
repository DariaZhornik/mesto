const popup = document.querySelector('.popup')
const editBtn = document.querySelector('.profile__edit-btn')
const closeBtn = document.querySelector('.popup__close')
const popupForm = popup.querySelector('.popup__container')
const popupName = popupForm.querySelector('.popup__text_name')
const popupJob = popupForm.querySelector('.popup__text_job')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')

function popupToggle () {
  popup.classList.toggle('popup_is-opened')
}

function popupOverlayClose (event) {
  if (event.target !== event.currentTarget) {
    return
  }

  popupToggle()
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
popup.addEventListener('click', popupOverlayClose)
editBtn.addEventListener('click', formInfoFill)
popupForm.addEventListener('submit', formSubmitHandler)