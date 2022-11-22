import './styles/style.scss';
import './favicons/favicon.ico';

import Router from "./scripts/router";
import pages from './scripts/router/pages';

const gameContainer = document.getElementById('game');

const router = new Router(pages, gameContainer);

router.init();
