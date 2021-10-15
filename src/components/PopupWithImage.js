import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)

    this.imagePhoto = this.popup.querySelector('.popup__photo-watch')
    this.imageText = this.popup.querySelector('.popup__photo-watch-text')

    this.setEventListeners()
  }

  open(text, image) {
    super.open();

    this.imagePhoto.src = image;
    this.imagePhoto.alt = text;
    this.imageText.textContent = text;
  }
}