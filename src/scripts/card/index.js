import shirt from '../../images/cards/shirt.jpg';

export default class Card {
  constructor(
    id = '',
    path = '',
    attributes = {
      class: 'card-face card-face--front',
      width: '226',
      height: '314',
      alt: '',
    }
  ) {
    this.id = id;
    this.path = path;
    this.attributes = attributes;
    this.isCardOpen = false;
    this.ANIMATION_DELAY = 1000;
    this.template = `
      <div class="card">
        <img class="card-face" src=${shirt} width="226" height="314" alt="">
      </div>
    `;
    this.img = this.createImage();
    this.element = this.createElement();
  }

  createElement() {
    const el = document.createElement('div');

    el.innerHTML = this.template;

    return el.firstElementChild;
  }

  createImage() {
    const img = document.createElement('img');

    Object.entries(this.attributes).forEach((item) => {
      const [key, value] = item;

      img.setAttribute(key, value);
    });

    img.src = this.path;

    return img;
  }

  renderImage() {
    this.element.append(this.img);
  }

  flip() {
    if (this.isCardOpen) {
      setTimeout(() => this.removeImage(), this.ANIMATION_DELAY);
    } else {
      this.renderImage();
    }

    this.isCardOpen = !this.isCardOpen;
    this.element.classList.toggle('card--is-flipped');
  }

  removeImage() {
    this.element.lastChild.remove();
  }

  remove() {
    this.element.remove();
  }
}
