export default class Card {
    _cardData
    _cardElement
    _openPhotoCallback
    

    constructor(templateSelector, cardData, openPhoto) {
        this._cardData = cardData;
        this._cardElement = this.getTemplate(templateSelector)
        this._openPhoto = openPhoto;

        this.fillData()
        this.addEvents()
    }

    fillData() {
        const imageElement = this._cardElement.querySelector('.element__photo')

        imageElement.src = this._cardData.image;
        imageElement.alt = this._cardData.text;
        imageElement.dataset.text = this._cardData.text;

        this._cardElement.querySelector('.element__photo-text').textContent = this._cardData.text;
    }

    addEvents() {
        const likeBtn = this._cardElement.querySelector('.element__like-button');
        const trashBtn = this._cardElement.querySelector('.element__trash');
        const photo = this._cardElement.querySelector('.element__photo');

        likeBtn.addEventListener('click', this.likeCard)
        trashBtn.addEventListener('click', this.deleteCard)
        photo.addEventListener('click', this.openPhotoHandler)
    }

    getTemplate(templateSelector) {
        return document
            .querySelector(templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    generateCard() {
        return this._cardElement
    }

    likeCard(event) {
        event.target.classList.toggle('element__like-button_active');
    }

    deleteCard(event) {
        event.target.closest('.element').remove();
    }

    onOpenPhoto(callback) {
        this._openPhotoCallback = callback
    }

    openPhotoHandler = (event) => {
        if (this._openPhotoCallback) {
            this._openPhotoCallback(event.target.src, event.target.alt)
        }
    }

}