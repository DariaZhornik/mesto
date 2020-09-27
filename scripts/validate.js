const params = {
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(params.errorClass);
};

const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    
    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector))
    const buttonElement = formElement.querySelector(params.submitButtonSelector);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);        toggleButtonState(inputList, buttonElement);
        });

    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

enableValidation(params);