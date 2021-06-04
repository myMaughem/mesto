export default class FormValidator {
  #hasListeners = false

  constructor({ inputSelector, submitButtonSelector, inputErrorClass, inputErrorTextClass }, formElement) {
    this.formElement = formElement
    this.inputSelector = inputSelector
    this.submitButtonSelector = submitButtonSelector
    this.inputErrorClass = inputErrorClass
    this.inputErrorTextClass = inputErrorTextClass
  }

  enableValidation() {
    this.#setEventListener();
    this.#hideInputErrors();
  }

  #setEventListener() {
    if (this.#hasListeners) return;

    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState(buttonElement, inputList);
      });
    });
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this.#hasListeners = true;
  }

  #checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this.#hideInputError(inputElement);
    } else {
      this.#showInputError(inputElement);
    };
  }

  #hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.remove(this.inputErrorTextClass);
    errorElement.textContent = '';

    inputElement.classList.remove(this.inputErrorClass);
  }

  #showInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this.inputErrorTextClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  #toggleButtonState(buttonElement, inputList) {
    buttonElement.disabled = this.#hasInvalidInput(inputList)
  }

  #hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid)
  };

  #hideInputErrors() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    this.#toggleButtonState(buttonElement, inputList);
    inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
    })
  }
}
