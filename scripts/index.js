let popup = document.querySelector('.popup')
let editBtn = document.querySelector('.profile__edit-btn')
let addBtn = document.querySelector('.profile__add-btn')
let closeBtn = document.querySelector('.popup__close')
let saveBtn = document.querySelector('.popup__save')

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

let popupName = document.querySelector('.popup__name')
let popupJob = document.querySelector('.popup__job')
let profileName = document.querySelector('.profile__title')
let profileJob = document.querySelector('.profile__subtitle')

popupName.textContent = 'l' 
popupJob.textContent = 'j'