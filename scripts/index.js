const popup = document.querySelector('.popup')
const editBtn = document.querySelector('.profile__edit-btn')
const closeBtn = document.querySelector('.popup__close')
const saveBtn = document.querySelector('.popup__save')
const popupForm = popup.querySelector('.popup__container')
const popupName = popupForm.querySelector('.popup__text_name')
const popupJob = popupForm.querySelector('.popup__text_job')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')

function popupToggle () {
    popup.classList.toggle('popup_is-opened')
}

function popupOverlayClose (event) {
  console.log({
    target: event.target,
    currentTarget: event.currentTarget,
  })
  if (event.target !== event.currentTarget) {
    return
  }

  popupToggle(event)
}

function formSubmitHandler (evt) {
  evt.preventDefault() 
  profileName.textContent = popupName.value
  profileJob.textContent = popupJob.value
}  

function formInfoFill (evt) {
  evt.preventDefault() 
  popupName.value = profileName.textContent
  popupJob.value = profileJob.textContent
}  

editBtn.addEventListener('click', popupToggle)
closeBtn.addEventListener('click', popupToggle)
saveBtn.addEventListener('click', popupToggle)
popup.addEventListener('click', popupOverlayClose)
editBtn.addEventListener('click', formInfoFill)
popupForm.addEventListener('submit', formSubmitHandler)