import Card from '../components/Card.js';

export default class Section {
  constructor({ data }, containerSelector) {
    this.renderer = data;
    this.container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.renderer.forEach((item) => {

      const card = new Card(item, '#element_template');

      const cardElement = card.generateCard();
      this.addItem(cardElement);
    })
  }
  addItem(element) {
    this.container.prepend(element);
  }
}