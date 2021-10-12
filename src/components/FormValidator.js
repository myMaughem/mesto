export default class FormValidator {
  _hasListeners = false

  constructor({ inputSelector, submitButtonSelector, inputErrorClass, inputErrorTextClass }, formElement) {
    this.formElement = formElement
    this.inputSelector = inputSelector
    this.submitButtonSelector = submitButtonSelector
    this.inputErrorClass = inputErrorClass
    this.inputErrorTextClass = inputErrorTextClass

    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    this.inputList = inputList
    this.buttonElement = buttonElement
  }

  enableValidation() {
    this._setEventListener();
  }

  _setEventListener() {
    if (this._hasListeners) return;

// сброс ошибок формы
    this.formElement.addEventListener('reset', () => {
      this.hideInputErrors();
    });

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._hasListeners = true;
  }
  // скрытие/открытие ошибок инпутов
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

// доступность кнопки save
  _toggleButtonState() {
    this.buttonElement.disabled = this._hasInvalidInput()
  }

//  проверка поля на валидность
  _hasInvalidInput() {
    return this.inputList.some(inputElement => !inputElement.validity.valid)
  };

  hideInputErrors() {
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}