export const validationParams = {
    formSelector: '.popup__content_edit',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
  }

import Api from '../components/Api.js'
import { ownerInfo } from './config.js'

export const popupAddForm = document.querySelector('.popup__content_add');
export const popupEditForm = document.querySelector('.popup__content_edit');
export const popupChangeForm = document.querySelector('.popup__content_avatar')
export const elementSelector = '.element-template';
export const editPopup = document.querySelector('.popup_type_edit')
export const addPopup = document.querySelector('.popup_type_add')
export const avatarPopup = document.querySelector('.popup_type_edit-photo')
export const addBtn = document.querySelector('.profile__add-btn')
export const editBtn = document.querySelector('.profile__edit-btn')
export const addPopupClose = addPopup.querySelector('.popup__close')
export const photoPopup = document.querySelector('.popup_type_photo');
export const photoPopupImage = photoPopup.querySelector(".popup__image_type_photo")
export const photoPopupTitle = photoPopup.querySelector(".popup__title_type_photo")
export const profilePhoto = document.querySelector('.profile__image-wrap')
export const api = new Api(ownerInfo);
export const inputSelector = '.popup__input'
export const elementsSelector = '.elements'
export const photoPopupSelector = '.popup_type_photo'
export const imageSelector = ".popup__image_type_photo"
export const figCaptionSelector = ".popup__title_type_photo"
export const addPopupFormSelector = ".popup__content_add"
export const addPopupSelector = ".popup_type_add"
export const editPopupSelector = ".popup_type_edit"
export const editPopupFormSelector = '.popup__content_edit'
export const editPhotoPopupFormSelector = '.popup__content_avatar'
export const editPhotoPopupSelector = '.popup_type_edit-photo'
export const deletePopupSelector = '.popup_type_delete'
export const submitButton = document.querySelector('.popup__submit')
export const popupTextName = document.querySelector('.popup__text_name')
export const popupTextJob = document.querySelector('.popup__text_job')
export const userName = document.querySelector('.profile__title')
export const userDescription = document.querySelector('.profile__subtitle')
export const userAvatar = document.querySelector('.profile__image')
