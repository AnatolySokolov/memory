import './styles/style.scss';
import './favicons/favicon.ico';
import './images/cards/index';

function onCardClick(e) {
  if (e.target.tagName !== 'IMG') return;

  const card = e.target.closest('.card');

  card.classList.toggle('card--is-flipped');
}

const table = document.querySelector('.game-table');

table.addEventListener('click', (e) => onCardClick(e));
