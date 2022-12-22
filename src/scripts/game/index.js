import Utils from "../utils";
import Card from "../card";

const removePngExtRegExp = /(\.\/)|(\.png)/g;

export default class Game {
  constructor({ TOTAL_PAIRS, RATIO, TIME_TO_REMEMBER }) {
    this.TOTAL_PAIRS = TOTAL_PAIRS;
    this.RATIO = RATIO;
    this.TIME_TO_REMEMBER = TIME_TO_REMEMBER;
    this.TIME_DELAY = 2000;
    this.container = document.getElementById('table');
    this.scoreOutput = document.getElementById('score-output');
    this.cards = Utils.getImportAssets(
      require.context('../../images/cards/', false, /\.png$/),
      removePngExtRegExp
    );
    this.hand = null;
    this.openedPairs = 0;
    this.score = 0;
    this.firstCard = null;
    this.eventListenerEnabled = false;

    this.init();
  }

  onCardClick(e) {
    if (!e.target.classList.contains('card-face')) return;

    const currentCard = this.hand.find(
      (card) => card.element === e.target.closest('.card')
    );

    // click on the same card || multiple click
    if (currentCard === this.firstCard || !this.eventListenerEnabled) return;

    currentCard.flip();

    // first card
    if (!this.firstCard) {
      this.firstCard = currentCard;

      return;
    }

    let isGuessed = null;

    this.eventListenerEnabled = false;

    // second card
    if (currentCard.id === this.firstCard.id) {
      isGuessed = true;
    } else {
      isGuessed = false;
    }

    setTimeout(() => {
      if (isGuessed) {
        currentCard.remove();
        this.firstCard.remove();
      } else {
        currentCard.flip();
        this.firstCard.flip();
      }

      this.firstCard = null;
      this.countScore(isGuessed);
      this.roundUpScore();
      this.scoreOutput.innerHTML = this.score;

      if (isGuessed) {
        this.openedPairs += 1;
      }
    }, this.TIME_DELAY);

    setTimeout(() => {
      this.eventListenerEnabled = true;

      // end game
      if (this.openedPairs === this.TOTAL_PAIRS) {
        this.endGame();
      }
    }, this.TIME_DELAY + 1000);
  }

  createSet() {
    const keys = Object.keys(this.cards);
    const set = new Set();

    while (set.size < this.TOTAL_PAIRS) {
      const randomInt = Utils.getRandomInt(keys.length - 1);

      set.add(keys[randomInt]);
    }

    this.hand = set;

    return this;
  }

  double() {
    this.hand = [...this.hand, ...this.hand];

    return this;
  }

  shuffle() {
    this.hand.forEach((key, i) => {
      const j = Utils.getRandomInt(i);

      [this.hand[i], this.hand[j]] = [this.hand[j], this.hand[i]];
    });

    return this;
  }

  createHand() {
    this.hand = this.hand.map((id) => {
      const path = this.cards[id];

      return new Card(id, path);
    });

    return this;
  }

  renderCardItems() {
    this.hand.forEach((card, i) =>
      this.container.children[i].append(card.element)
    );

    return this;
  }

  flipAllCards() {
    this.hand.forEach((card) => card.flip());
  }

  countScore(isGuessed) {
    if (isGuessed) {
      this.score += (this.TOTAL_PAIRS - this.openedPairs) * this.RATIO;
    } else {
      this.score -= this.openedPairs * this.RATIO;
    }
  }

  roundUpScore() {
    if (this.score < 0) this.score = 0;
  }

  endGame() {
    this.container.dispatchEvent(
      new CustomEvent('end-game', {
        bubbles: true,
        detail: {
          score: this.score,
        },
      })
    );
  }

  init() {
    this.createSet()
      .double()
      .shuffle()
      .createHand()
      .renderCardItems()
      .flipAllCards();

    setTimeout(() => {
      this.flipAllCards();
    }, this.TIME_TO_REMEMBER);

    setTimeout(() => {
      this.eventListenerEnabled = true;
    }, this.TIME_TO_REMEMBER + 1000);

    this.container.addEventListener('click', (e) => this.onCardClick(e));
  }
}
