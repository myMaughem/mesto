class FormValidator {
  constructor(formSelector, inputSelector, submitButtonSelector, inputErrorClass, inputErrorTextClass) {
    this.formSelector = formSelector
    this.inputSelector = inputSelector
    this.submitButtonSelector = submitButtonSelector
    this.inputErrorClass = inputErrorClass
    this.inputErrorTextClass = inputErrorTextClass
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    this.formList = formList;
    formList.forEach((formElement) => {
      this.formElement = formElement;
      this.setEventListener();
      this.openPopupClear();
    });
  }

  setEventListener() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
    this.inputList = inputList;
    this.buttonElement = buttonElement;

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.toggleButtonState(buttonElement, inputList);
  }

  checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this.hideInputError(inputElement);
    } else {
      this.showInputError(inputElement);
    };
  }

  hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.remove(this.inputErrorTextClass);
    errorElement.textContent = '';

    inputElement.classList.remove(this.inputErrorClass);
  }

  showInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this.inputErrorTextClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  toggleButtonState(buttonElement, inputList) {
    if (this.hasInvalidInput(inputList)) {
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.disabled = false;
    };
  }

  hasInvalidInput(inputList) {
    return this.inputList.some(inputElement => !inputElement.validity.valid)
  };

  openPopupClear() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
    this.inputList = inputList;
    this.buttonElement = buttonElement;

    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.toggleButtonState(buttonElement, inputList);
    inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    })
  }

  clearInputError() {
    this.errorElement = errorElement;
    const errorElement = formElement.querySelectorAll(`.${inputElement.id}-error`)
    errorElement.textContent = '';
  }
}