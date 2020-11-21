import Popup from './Popup.js'
export default class PopupConfirmation extends Popup {
    constructor(popupSelector){
        super(popupSelector);
    }

    setConfirmation(action) {
        this._handleConfirmCallback = action;
      }

setEventListeners(){
    super.setEventListeners();
    this._element.querySelector('.popup__content_delete').addEventListener('submit', event => {
    event.preventDefault();
    this._handleConfirmCallback(); 
    });
}
}