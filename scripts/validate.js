const showInputError = (formElement, inputElement, errorMessage, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, errorClass) => {
    const isInputNotValid = !inputElement.validity.valid;
    
    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage, errorClass);
    } else {
        hideInputError(formElement, inputElement, errorClass);
    }
};

const hasInvalidInput = (inputList, inactiveButtonClass) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };
  
  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList, inactiveButtonClass)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, errorClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach(inputElement => {
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);    
        inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, errorClass);     
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);   
        });
    });
};

const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList .forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, rest); 
    })
  };

enableValidation({
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
});