export default class Card {
    #cardData
    #cardElement
    constructor(templateSelector, cardData) {
        this.#cardData = cardData;
        this.#cardElement = this.getTemplate(templateSelector)

        this.fillData()
        this.addEvents()
    }

    fillData() {
        const imageElement = this.#cardElement.querySelector('.element__photo')

        imageElement.src = this.#cardData.image;
        imageElement.alt = this.#cardData.text;
        imageElement.dataset.text = this.#cardData.text;

        this.#cardElement.querySelector('.element__photo-text').textContent = this.#cardData.text;
    }

    addEvents() {
        const likeBtn = this.#cardElement.querySelector('.element__like-button');
        const trashBtn = this.#cardElement.querySelector('.element__trash');
        const image = this.#cardElement.querySelector('.element__photo');
        const text = this.#cardElement.querySelector('.element__photo-text');
        const popupPhotoOpenBlock = this.#cardElement.querySelector('.popup__photo-watch');
        const popupPhotoOpenText = this.#cardElement.querySelector('.popup__photo-watch-text');


        likeBtn.addEventListener('click', this.likeCard)
        trashBtn.addEventListener('click', this.deleteCard)
        image.addEventListener('click', this.openCard)
    }

    getTemplate(templateSelector) {
        return document
            .querySelector(templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
    }

    generateCard() {
        return this.#cardElement
    }

    likeCard(event) {
        event.target.classList.toggle('element__like-button_active');
    }

    deleteCard(event) {
        event.target.closest('.element').remove();
    }

    openCard(event) {
        openPopup(popupPhotoOpen);
        popupPhotoOpenBlock.src = event.target.src;
        popupPhotoOpenBlock.alt = event.target.alt;
        popupPhotoOpenText.textContent = event.target.dataset.text;
    }

    openPopup(openPopup) {
        openPopup.classList.add('popup_opened');
    }

}