import { closeProfileBtn, closeEdtPhotoBtn, closeImageBtn, profileSaveBtn, savePhotoBtn } from '../utils/constants.js'

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
    closeProfileBtn.addEventListener('click', () => {
      this.close();
    })
    closeEdtPhotoBtn.addEventListener('click', () => {
      this.close();
    })
    closeImageBtn.addEventListener('click', () => {
      this.close();
    })

    profileSaveBtn.addEventListener('click', () => {
      this.close();
    })
    savePhotoBtn.addEventListener('click', () => {
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

