export default class Card {

  constructor(data, cardSelector, handlers) {
    this.data = data;

    this.data.isCardLiked = this.isCardLiked(data.userId)
    this.data.isAvailableToRemove = data.userId === data.owner._id

    this.cardSelector = cardSelector;

    this.handleCardClick = handlers.onCardClick;
    this.handleLikeClick = handlers.onLikeClick;
    this.handleTrashClick = handlers.onTrashClick;
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
    const trashBtn = this.element.querySelector('.element__trash');

    this.element.querySelector('.element__trash').classList.toggle('element__trash_hidden', !this.data.isAvailableToRemove)
    this.element.querySelector('.element__photo').src = this.data.link;
    this.element.querySelector('.element__photo').alt = this.data.name;
    this.element.querySelector('.element__photo-text').textContent = this.data.name;

    this.renderLikes()

    return this.element;
  }

  updateLikes(userId, likes) {
    this.data.likes = likes
    this.data.isCardLiked = this.isCardLiked(userId)

    this.renderLikes()
  }

  renderLikes() {
    this.element.querySelector('.element__like-count').textContent = this.data.likes.length;
    this.element.querySelector('.element__like-button').classList.toggle('element__like-button_active', this.data.isCardLiked);
  }

  addEvents() {
    const likeBtn = this.element.querySelector('.element__like-button');
    const trashBtn = this.element.querySelector('.element__trash');
    const photoElement = this.element.querySelector('.element__photo');

    likeBtn.addEventListener('click', (event) => this.likeCard(event))

    trashBtn.addEventListener('click', () => this.handleTrashClick(this.data._id))
    photoElement.addEventListener('click', () => {
      this.handleCardClick(this.data.name, this.data.link)
    })
  }

  likeCard() {
    this.handleLikeClick(this.data._id)
  }

  deleteCard() {
    this.element.remove();
  }

  isCardLiked(userId) {
    return this.data.likes.some(card => card._id === userId)
  }
}