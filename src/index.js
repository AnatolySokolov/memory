import './styles/style.scss';
import './favicons/favicon.ico';

import Router from './scripts/router';
import pages from './scripts/router/pages';

new Router(pages).init();
