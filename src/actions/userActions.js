import axios from 'axios';
import Auth from '../utils/Auth';

export function localSignup(email, password){
  return {
    type: 'LOCAL_SIGNUP',
    payload: axios.post('/api/users/signup', {email, password})
  }
}

export function localLogin(email, password){
  return {
    type: 'LOGIN',
    payload: axios.post('/api/users/login', { email, password })
  };
}

export function localConnect(email, password, social_email, social_provider){
  return {
    type: 'LOCAL_CONN',
    payload: axios.post('/api/users/info', { email, password, social_email, social_provider})
  }
}

export function socialSignup(socialResponse){
  return {
    type: 'SOCIAL_SIGNUP',
    payload: axios.get('/api/users/social/signup', {
      headers: {
        access_token: socialResponse._token.accessToken,
        strategy: `${socialResponse._provider}-token`
      }
    })
  }
}

export function socialLogin(socialResponse){
  return {
    type: 'SOCIAL_LOGIN',
    payload: axios.get('/api/users/social/login', {
      headers: {
        access_token: socialResponse._token.accessToken,
        strategy: `${socialResponse._provider}-token`
      }
    })
  };
}

export function socialConnect(socialResponse, local_email){
  return {
    type: 'SOCIAL_CONNECT',
    payload: axios.get('/api/users/social/connect', {
      headers: {
        access_token: socialResponse._token.accessToken,
        strategy: `${socialResponse._provider}-token`,
        local_email
      },
    })
  }
}

export function socialUnlink(socialResponse){
  return {
    type: 'SOCIAL_UNLINK',
    payload: axios.get('/api/users/social/unlink', {
      headers: {
        access_token: socialResponse._token.accessToken,
        strategy: `${socialResponse._provider}-token`
      }
    })
  }
}

// TODO: still cannot handle error here: error message is in then phase
// export function getUserInfo(dispatch){
//   /* Trigger update data between reducers after an async action */
//   /* Can use smarter way: middleware. However this kind of code is kept here
//    for studying */
//
//   if (Auth.isUserAuthenticated()) {
//     dispatch({type: 'GET_USER_INFO_PENDING'});
//     axios.get('/api/users/getinfo', {
//       headers: {authorization: `bearer ${Auth.getToken()}`}
//     })
//     .then(function(response){
//       dispatch({type: 'GET_USER_INFO_FULFILLED', payload: response});
//     })
//     .catch(function(error){
//       dispatch({type: 'GET_USER_INFO_FULFILLED', payload: error});
//     })
//   } else {
//     dispatch({type: 'DO_NOTHING'});
//   }
// }

export function getUserInfo() {
  if (Auth.isUserAuthenticated()){
    return {
      type: 'GET_USER_INFO',
      payload: axios('/api/users/getinfo', {
        headers: {authorization: `bearer ${Auth.getToken()}`}
      })
    };
  } else {
    return {type: 'DO_NOTHING'};
  }
}

export function logout(){
  return {
    type: 'LOGOUT'
  }
}
