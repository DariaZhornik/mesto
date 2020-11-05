import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
    constructor({popupSelector, imageSelector, figCaptionSelector}){
        super(popupSelector);
        this._image = document.querySelector(imageSelector);
        this._figCaption = document.querySelector(figCaptionSelector);
    }
    open(name, link){
        super.open();
        this._image.src = link;
        this._image.alt = name;
        this._figCaption.textContent = name;
    }
}
