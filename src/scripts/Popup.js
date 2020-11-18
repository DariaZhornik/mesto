export default class Popup {
    constructor(popupSelector){
        this._element = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closePopupOverlay = this._closePopupOverlay.bind(this);
    }

    open(){
        this._element.classList.add('popup_is-opened');
        document.addEventListener('keyup', this._handleEscClose);
        this._element.addEventListener('click', this._closePopupOverlay);
    }


    close(){
        this._element.classList.remove('popup_is-opened');
        document.removeEventListener('keyup', this._handleEscClose);
        this._element.removeEventListener('click', this._closePopupOverlay);
    }

    _handleEscClose(evt){
        if (evt.key === "Escape") {
        this.close();      
    }
  }

    _closePopupOverlay(event){
        if (event.target === event.currentTarget) {
          this.close();
        }
    }

    setEventListeners(){
        this._element.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
          });    
    }
  }
