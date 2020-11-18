import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
    constructor (popupSelector, setSubmitCallback) {
        super(popupSelector);
        this._setSubmitCallback = setSubmitCallback;
    }

    open(id, card){
        super.open();
        this._id = id;
        this._card = card; 
    }

    setEventListeners(){
        super.setEventListeners();
        this._element.querySelector('.popup__content_delete').addEventListener('submit', (event) => {
            event.preventDefault();
            this._setSubmitCallback(this._id, this._card)
        })
    }
}

