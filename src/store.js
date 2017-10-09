import { applyMiddleware, createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';

import syncUserMiddleware from './utils/syncUser';

import reducer from './reducers/index';

export let history = createHistory();

const middleware = applyMiddleware(syncUserMiddleware, routerMiddleware(history), promise(), thunk, logger);

export default createStore(reducer, middleware);
