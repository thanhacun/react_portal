//TODO: additional information in homepage (route /)
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

import registerServiceWorker from './registerServiceWorker';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import RichTextEditor from './components/RichTextEditor';

import store, { history } from './store';

import appRoutes from './data/apps';
import tcctRoutes from './data/tcct';

const app = document.getElementById('root');

ReactDOM.render(
<Provider store={store}>
  <ConnectedRouter history={history}>
    <div>
      <Menu />
      <Route exact path="/" component={Welcome} />
      <Route path="/richtext" component={RichTextEditor} />
      {/* generate automatically app routes */}
      {appRoutes}
      {tcctRoutes}
    </div>
  </ConnectedRouter>
</Provider>, app);
registerServiceWorker();
