import Inferno from 'inferno';
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// containers
import App from './shared/containers/App';
import * as Start from './start';

const browserHistory = createBrowserHistory();

const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Start.Container} />
    </Route>
  </Router>
);

export default routes;
