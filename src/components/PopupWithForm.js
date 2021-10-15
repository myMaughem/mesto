import Popup from "./Popup.js"

// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector('.popup__form');

    this.setEventListeners()
  }

  open() {
    super.open();
    const popupBtn = this.popup.querySelector('.popup__save-button')
    popupBtn.disabled = true;
  }
  // при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    
    this.form.reset();
  }
  // собирает данные всех полей формы.
  _getInputValues() {
    const inputList = this.popup.querySelectorAll('.popup__input-text');
    const formValues = {};

    inputList.forEach(input => formValues[input.name] = input.value);

    return formValues;
  }
  // добавлять обработчик сабмита формы.
  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this.close()
    })

    super.setEventListeners();
  }
}