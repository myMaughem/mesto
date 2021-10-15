export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add('popup_opened');
  }

  close() {
    this.popup.classList.remove('popup_opened');
  }
  // закрытие на esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const closeBtn = this.popup.querySelector('.popup__close-icon');
    closeBtn.addEventListener('click', () => {
      this.close();
    })

    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })

    document.addEventListener('keydown', this._handleEscClose);
  }
}