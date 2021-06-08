export default class FormValidator {
  _hasListeners = false

  constructor({ inputSelector, submitButtonSelector, inputErrorClass, inputErrorTextClass }, formElement) {
    this.formElement = formElement
    this.inputSelector = inputSelector
    this.submitButtonSelector = submitButtonSelector
    this.inputErrorClass = inputErrorClass
    this.inputErrorTextClass = inputErrorTextClass
  }

  enableValidation() {
    this._setEventListener();
  }

  _setEventListener() {
    if (this._hasListeners) return;

    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    this.formElement.addEventListener('reset', () => {
      this._hideInputErrors();
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement, inputList);
      });
    });
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._hasListeners = true;
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    };
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.remove(this.inputErrorTextClass);
    errorElement.textContent = '';

    inputElement.classList.remove(this.inputErrorClass);
  }

  _showInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this.inputErrorTextClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _toggleButtonState(buttonElement, inputList) {
    buttonElement.disabled = this._hasInvalidInput(inputList)
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid)
  };

  _hideInputErrors() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    this._toggleButtonState(buttonElement, inputList);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }
}
