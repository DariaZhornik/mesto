export default class Card {
    constructor(name, link, handleCardClick, selector) {
        this._selector = selector;
	    this._name = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        return document.querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true)    
    }

    _deleteHandler(){
        this._element.remove();
        this._element = null;
    }
    
    _likeHandler(){
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _setListeners(){
        this._element.querySelector('.element__delete').addEventListener('click', ()=>this._deleteHandler());
        this._element.querySelector('.element__like').addEventListener('click', ()=>this._likeHandler());
        this._image.addEventListener('click', ()=>this._handleCardClick(this._name, this._link));
    }

    getElement(){
        this._element = this._getTemplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = this._name; 
        this._setListeners();
        return this._element;
    }
}

