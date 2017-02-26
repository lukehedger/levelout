import { render } from 'inferno';

import routes from './routes';
import { isDevelopment } from '~/shared/util';

// if ( isDevelopment() ) require('inferno-devtools');

render(routes, document.getElementById('Root'));
