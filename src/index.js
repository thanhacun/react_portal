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

import store, { history } from './store';

import appsList from './data/apps';
const appRoutes = appsList.map(function(app){
  return (
    <Route path={app.path} component={app.component} key={`app_${app.id}`} />
  );
});

const app = document.getElementById('root');

ReactDOM.render(
<Provider store={store}>
  <ConnectedRouter history={history}>
    <div>
      <Menu />
      <Route exact path="/" component={Welcome} />
      {/* generate automatically app routes */}
      {appRoutes}
    </div>
  </ConnectedRouter>
</Provider>, app);
registerServiceWorker();
