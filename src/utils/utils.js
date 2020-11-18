import { api } from './constants.js'

export function changeButtonValue(formSelector, text){
    document.querySelector(formSelector).querySelector('.popup__save').textContent = text;
  }
  
export  function setSubmitCallback(id, element){
    api.deleteCard(id)
        .then(() => {
            element.remove();
            this.close();
        })
        .catch(() => console.error('Ошибка'));
  }

  