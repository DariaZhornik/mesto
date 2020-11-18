import { deletePopup } from '../pages/index.js';
import { api } from './constants.js'

export function changeButtonValue(formSelector, text){
    document.querySelector(formSelector).querySelector('.popup__save').textContent = text;
  }
  
export  function setSubmitCallback(id, element){
    deletePopup.open()
    document.querySelector('.popup__content_delete').addEventListener('submit', event => {
        event.preventDefault();
    })
    api.deleteCard(id)
        .then(() => {
            element.remove();
            deletePopup.close();
        })
        .catch(() => console.error('Ошибка'));
  }

  