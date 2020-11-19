import Popup from './Popup.js'
export default class PopupConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

callSubmitCallback(id, card, setSubmitCallback){
    this._setSubmitCallback = setSubmitCallback;
    this._id = id;
    this._card = card;
}

setEventListeners(){
    super.setEventListeners();
    this._element.querySelector('.popup__delete').addEventListener('click', event => {
    event.preventDefault();
    this._setSubmitCallback(this._id, this._card); 
    });
}
}