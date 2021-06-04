// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет один публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.

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
      // this.openPopupClear();
    });
  }

  setEventListener() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
    this.inputList = inputList;
    this.buttonElement = buttonElement;

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.inputElement = inputElement;
        this.checkInputValidity();
        this.toggleButtonState();
      });
    });
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.toggleButtonState(buttonElement, inputList);
  }

  checkInputValidity() {
    if (this.inputElement.validity.valid) {
      this.hideInputError();
    } else {
      this.showInputError();
    };
  }

  hideInputError() {
    const errorElement = this.formElement.querySelector(`.${this.inputElement.id}-error`)
    this.errorElement = errorElement;

    this.inputElement.classList.remove(this.inputErrorClass);
    this.errorElement.classList.remove(this.inputErrorTextClass);
    this.errorElement.textContent = '';
  }

  showInputError() {
    const errorElement = this.formElement.querySelector(`.${this.inputElement.id}-error`)
    this.errorElement = errorElement;

    this.inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this.inputErrorTextClass);
    errorElement.textContent = this.inputElement.validationMessage;
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

  // openPopupClear() {
  //   const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
  //   const buttonElement = formElement.querySelector(this.submitButtonSelector);
  //   this.inputList = inputList;
  //   this.buttonElement = buttonElement;

  //   formElement.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //   });
  //   this.toggleButtonState(buttonElement, inputList);
  //   inputList.forEach((inputElement) => {
  //     this.hideInputError(formElement, inputElement);
  //   })
  // }

  clearInputError() {
    this.errorElement = errorElement;
    const errorElement = formElement.querySelectorAll(`.${inputElement.id}-error`)
    errorElement.textContent = '';
  }
}

const formValidatorProfile = new FormValidator('.popup__form', '.popup__input-text', '.popup__save-button',
  'popup__input-text_type_error', 'popup__input-error_active')
formValidatorProfile.enableValidation();

const formValidatorPhoto = new FormValidator('.popup__form', '.popup__input-text', '.popup__save-button',
  'popup__input-text_type_error', 'popup__input-error_active')
formValidatorPhoto.enableValidation();