class FormValidator {
    constructor(params, formElement){
      this._formElement = formElement;
      this._inputSelector = params.inputSelector;
      this._submitButtonSelector = params.submitButtonSelector;
      this._inactiveButtonClass = params.inactiveButtonClass;
      this._inputErrorClass = params.inputErrorClass;
      this._errorClass = params.errorClass;
    }
    
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
    
    _hideInputError(inputElement)  {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    };

    _getErrorMessage(inputElement){
    return inputElement.validationMessage;
    };

    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid;
        
        if (isInputNotValid) {
            const errorMessage = this._getErrorMessage(inputElement);
            this._showInputError(inputElement, errorMessage);
        } else {
          this._hideInputError(inputElement);
        }
    };
    
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid);
      };
      
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.setAttribute("disabled", true);
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.removeAttribute("disabled");
        }
      };
    
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        inputList.forEach(inputElement => {
            this._toggleButtonState(inputList, buttonElement);    
            inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);     
            this._toggleButtonState(inputList, buttonElement);   
            });
        });
    };

    enableValidation = () => {
        const submitFormHandler = (event) => {
          event.preventDefault();
        };
        this._formElement.addEventListener("submit", submitFormHandler);
      
        this._setEventListeners();
      };
    }

    export default FormValidator;