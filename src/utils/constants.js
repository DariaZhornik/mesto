export const validationParams = {
    formSelector: '.popup__content_edit',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
  }

import Api from '../scripts/Api.js'
import { ownerInfo } from './config.js'

export const popupAddForm = document.querySelector('.popup__content_add');
export const popupEditForm = document.querySelector('.popup__content_edit');
export const popupChangeForm = document.querySelector('.popup__content_avatar')
export const elementSelector = '.element-template';
export const editPopup = document.querySelector('.popup_type_edit')
export const addPopup = document.querySelector('.popup_type_add')
export const addBtn = document.querySelector('.profile__add-btn')
export const editBtn = document.querySelector('.profile__edit-btn')
export const addPopupClose = addPopup.querySelector('.popup__close')
export const photoPopup = document.querySelector('.popup_type_photo');
export const photoPopupImage = photoPopup.querySelector(".popup__image_type_photo")
export const photoPopupTitle = photoPopup.querySelector(".popup__title_type_photo")
export const profilePhoto = document.querySelector('.profile__image-wrap')
export const api = new Api(ownerInfo);