export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.itemRenderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderer(direction = 'after') {
    this.container.innerHTML = '';

    this.items.forEach(itemData => {
      const itemElement = this.itemRenderer(itemData);

      this.addItem(itemElement, direction);
    })
    return this;
  }

  addItem(element, direction) {
    if (direction === 'after') {
      this.container.append(element);
    } else {
      this.container.prepend(element);
    }
    return this;
  }

  setItems(items) {
    this.items = items;
    return this;
  }
}