class Card {
    constructor(item, selector, prependCard) {
        this._selector = selector;
	    this._name = item.name;
        this._link = item.link;
        this._prependCard = prependCard;
    }

    _getTemplate(){
        return document.querySelector(this._selector).content.cloneNode(true).children[0];
    }

    _deleteHandler(){
        this._element.remove();
    }
    
    _likeHandler(){
        this._like.classList.toggle('element__like_active');
    }

    _openPhotoPopup() {
      openPopup(photoPopup);
      photoPopupImage.src = this._link;
      photoPopupImage.alt = this._name;
      photoPopupTitle.textContent = this._name; 
}

    _setListeners(){
        this._element.querySelector('.element__delete').addEventListener('click', ()=>this._deleteHandler());
        this._like.addEventListener('click', ()=>this._likeHandler());
        this._image.addEventListener('click', ()=>this._openPhotoPopup());
    }

    getElement(){
        this._element = this._getTemplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._image = this._element.querySelector('.element__image');
        this._like = this._element.querySelector('.element__like');
        this._image.src = this._link;
        this._image.alt = this._name; 
        this._setListeners();
        return this._element;
    }
}

export default Card;
import { photoPopup, photoPopupImage, photoPopupTitle, openPopup } from './index.js'