export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.itemRenderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderer() {
    this.container.innerHTML = '';

    this.items.forEach(itemData => {
      const itemElement = this.itemRenderer(itemData);

      this.addItem(itemElement);
    })
  }

  addItem(element) {
    this.container.prepend(element);
  }
}