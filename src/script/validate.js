function openPopupClear(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  toggleButtonState(buttonElement, inputList);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  })
}

const clearInputError = (formElement) => {
  const errorElement = formElement.querySelectorAll(`.${inputElement.id}-error`)
  errorElement.textContent = '';
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.inputErrorTextClass);
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.inputErrorTextClass);
  errorElement.textContent = inputElement.validationMessage;
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  };
};

const toggleButtonState = (buttonElement, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
};

const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(buttonElement, inputList);
    });
  });
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  toggleButtonState(buttonElement, inputList);
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, config);
    openPopupClear(formElement, config);
  });
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input-text_type_error',
  inputErrorTextClass: 'popup__input-error_active'
};

enableValidation(config);