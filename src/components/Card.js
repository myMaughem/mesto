export default class Card {

  constructor(data, cardSelector, handleCardClick) {
    this.cardSelector = cardSelector;
    this.text = data.text;
    this.image = data.image;
    this.handleCardClick = handleCardClick
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
    this.addEvents();

    this.element.querySelector('.element__photo').src = this.image;
    this.element.querySelector('.element__photo').alt = this.text;
    this.element.querySelector('.element__photo-text').textContent = this.text;

    return this.element;
  }

  addEvents() {
    const likeBtn = this.element.querySelector('.element__like-button');
    const trashBtn = this.element.querySelector('.element__trash');
    const photoElement = this.element.querySelector('.element__photo');

    likeBtn.addEventListener('click', this.likeCard)
    trashBtn.addEventListener('click', this.deleteCard)
    photoElement.addEventListener('click', () => {
      this.handleCardClick(this.text, this.image)
    })
  }

  likeCard(event) {
    event.target.classList.toggle('element__like-button_active');
  }

  deleteCard(event) {
    event.target.closest('.element').remove();
  }
}