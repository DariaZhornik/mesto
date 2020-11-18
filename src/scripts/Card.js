import { deletePopup } from '../pages/index.js'

export default class Card {
    constructor(name, link, cardId, ownerId, userId, likes, handleCardClick, handleDeleteCard, removeLikeFunction, addLikeFunction, selector) {
        this._selector = selector;
	    this._name = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._addLikeFunction = addLikeFunction;
        this._removeLikeFunction = removeLikeFunction;
        this._cardId = cardId;
        this._ownerId = ownerId;
        this._userId = userId; 
        this._likes = likes;
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
    

    _setListeners(){
        this._likeButton.addEventListener('click', ()=>this._changeLikeState());
        if (this._checkId()) {
            this._element.querySelector('.element__delete').classList.add('element__delete_visible');
            this._element.querySelector('.element__delete').addEventListener('click', ()=>
            deletePopup.open(this._cardId, this._element));
        }
        this._image.addEventListener('click', ()=>this._handleCardClick(this._name, this._link));
    }

    _changeLikeState(){
        if (this._likeButton.classList.contains('element__like_active')) {
            this._removeLikeFunction(this._cardId);
        }
        else {
            this._addLikeFunction(this._cardId);
        }
    }

    switchLikes(amount){
        this._likeButton.classList.toggle('element__like_active');
        this._element.querySelector('.element__like-count').textContent = amount;
    }

    _checkOwnLike(){
        this._likes.forEach(like => {
            if (like._id == this._userId) {
                this._likeButton.classList.add('element__like_active');
            }
        })
    }
    

    _checkId(){
        if (this._userId == this._ownerId) {
            return true;
        }
        else {
            return false;
        }
    }

    getElement(){
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__like');
        this._element.querySelector('.element__title').textContent = this._name;
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = this._name; 
        this._setListeners();
        this._element.querySelector('.element__like-count').textContent = this._likes.length;
        this._checkOwnLike();
        return this._element;
    }
}