import { deletePopup } from '../pages/index.js';
import { api } from './constants.js'

export function changeButtonValue(formSelector, text){
    document.querySelector(formSelector).querySelector('.popup__save').textContent = text;
  }

  
export function deleteCardCallback(id, element){
    deletePopup.open();
    deletePopup.callSubmitCallback(id, element, setSubmitCallback)
}  

export  function setSubmitCallback(id, element){
    api.deleteCard(id)
        .then(() => {
            element.remove();
            deletePopup.close();
        })
        .catch(() => console.error('Ошибка'));
  }

  