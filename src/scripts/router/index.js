import gameSettings from "../../gameSettings";
import Game from "../game";

export default class Router {
  constructor(pages) {
    this.pages = pages;
    this.container = document.getElementById('game');
  }

  onEndGame(e) {
    this.renderPage('score').then(() => {
      document.getElementById('result').innerHTML = e.detail.score;
    });
  }

  async onBtnClick(e) {
    if (e.target.tagName !== 'A') return;

    const link = e.target.getAttribute('name');

    if (link === 'game') {
      await this.renderPage(link).then(() => new Game(gameSettings));
    } else {
      this.renderPage(link);
    }
  }

  init() {
    this.container.addEventListener('end-game', (e) => this.onEndGame(e));
    this.container.addEventListener('click', (e) => this.onBtnClick(e));
    this.renderPage();
  }

  async renderPage(name = 'index') {
    const template = await this.pages[name];

    this.container.innerHTML = template.default;
  }
}
