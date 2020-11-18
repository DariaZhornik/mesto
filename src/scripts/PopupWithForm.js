import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSelector, handleFormSubmit}) {
        super(popupSelector);
        this._form = document.querySelector(formSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formSelector = formSelector;
    }

    _getInputValue(){
        this._formValue = {};
        this._popupText = this._form.querySelectorAll('.popup__input') 
        this._popupText.forEach(input => {
          this._formValue[input.name] = input.value;
        });
        return this._formValue;
      }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('click', () => {
        });
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValue());   
            this.close();
        });
    }

    close(){
        super.close();
        this._form.reset();
    }
}
