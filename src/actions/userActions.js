import axios from 'axios';
import Auth from '../utils/Auth';

export function localLogin(email, password){
  return {
    type: 'LOGIN',
    payload: axios.post('/api/users/login', { email, password })
  };
}

export function localSignup(email, password){
  return {
    type: 'LOCAL_SIGNUP',
    payload: axios.post('/api/users/signup', {email, password})
  }
}

export function facebookAuth(){
  return {
    type: 'FACEBOOK_AUTH',
    payload: axios({
      url: 'http://192.168.0.64:3036/api/users/auth/facebook',
      method: 'get',
      headers: {'X-Requested-With': 'XMLHttpRequest'}
  })
}}

export function socialConnect(token){
  return {
    type: 'SOCIAL_CONNECT',
    payload: axios.get('/api/users/social/connect/facebook?access_token=' + token)
  }
}

export function localConnect(){
  return {
    type: 'LOCAL_CONN',
    payload: axios.get('/api/users/info')
  }
}

export function facebookAuthToken(){
  return {
    type: 'FACEBOOK_AUTH_TOKEN',
    payload: axios.get('/api/users/auth/facebook/token?access_token=5bc7c1406800165cbbef783015ef85b7')
  }
}

export function facebookLogin(loginUser){
  return {
    type: 'SOCIAL_CLIENT_LOGIN',
    payload: loginUser
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
