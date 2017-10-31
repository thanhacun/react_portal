/* Reducers are just funtions */
//import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import map from './mapReducer';
import movies from './movieReducer';
import user from './userReducer';
import tcct from './tcctReducer'

export default (state={}, action) => {
  // this is how combineReducers works
  return {
    user: user(state.user, action),
    map: map(state.map, action, state.user),
    movies: movies(state.movies, action),
    tcct: tcct(state.tcct, action, state.user),
    router: routerReducer(state.router, action),
  };
};
