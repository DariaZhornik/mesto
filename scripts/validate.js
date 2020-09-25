const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove('popup__error_active');
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
      buttonElement.classList.add("form__submit_inactive");
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove("form__submit_inactive");
      buttonElement.removeAttribute("disabled");
    }
  };

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__text'))
    const buttonElement = formElement.querySelector('.popup__save');
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        });
        toggleButtonState(inputList, buttonElement);
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__content'));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

enableValidation();