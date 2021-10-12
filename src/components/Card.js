import { popupWithImage } from "../pages/index.js";
import { popupImagePhoto, popupImageText } from "../utils/constants.js"

export default class Card {

  constructor(data, cardSelector) {
    this.cardSelector = cardSelector;
    this.text = data.text;
    this.image = data.image;
  }

  getTemplate() {
    const cardElement = document
      .querySelector(this.cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return cardElement;
  }
  generateCard() {
    this.element = this.getTemplate();
    this.handleCardClick();
    this.addEvents();

    this.element.querySelector('.element__photo').src = this.image;
    this.element.querySelector('.element__photo').alt = this.text;
    this.element.querySelector('.element__photo-text').textContent = this.text;

    return this.element;
  }
  handleCardClick() {
    const photoElement = this.element.querySelector('.element__photo');
    photoElement.addEventListener('click', () => {
      popupWithImage.open();
      popupWithImage.setEventListeners();
      popupImagePhoto.src = this.image;
      popupImagePhoto.alt = this.text;
      popupImageText.textContent = this.text;
    })
  }

  addEvents() {
    const likeBtn = this.element.querySelector('.element__like-button');
    const trashBtn = this.element.querySelector('.element__trash');

    likeBtn.addEventListener('click', this.likeCard)
    trashBtn.addEventListener('click', this.deleteCard)
  }

  likeCard(event) {
    event.target.classList.toggle('element__like-button_active');
  }

  deleteCard(event) {
    event.target.closest('.element').remove();
  }
}