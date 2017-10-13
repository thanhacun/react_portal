import Auth from '../utils/Auth';

const userInitialState = {
  userEmail: null,
  busy: false,
  error: '',
  local: {},
  facebook: {},
  google: {},
  twitter: {}
};
const providers = ['local', 'facebook', 'google'];
let provider = null;

const cleanData = (rawData) => {
  // return clean user data (without _id and __v)
  return providers.reduce((accResult, provider) => {
    if (provider in rawData) {
      accResult[provider] = rawData[provider];
    } else {
      accResult[provider] = {};
    }
    return accResult;
  }, {});
}

const user = function(state=userInitialState, action){
  switch (action.type) {
    //TODO: all pending action return the same object
    case 'GET_USER_INFO_PENDING':
      return { ...state, busy: true };

    case 'GET_USER_INFO_FULFILLED':
      const userData = cleanData(action.payload.data);
      const userAccType = providers.filter(provider => provider in action.payload.data)[0];

      return {
        ...state,
        busy: false,
        ...userData,
        //TODO: better way to get user email because accounts are linked
        userEmail: userData[userAccType].email
      };

    case 'GET_USER_INFO_REJECTED':
      Auth.deauthenticateUser();
      return {
        ...state,
        busy: false,
        error: action.payload.message,
      }

    case 'LOCAL_SIGNUP_PENDING':
      return { ...state, busy: true}

    case 'LOCAL_SIGNUP_FULFILLED':
      return {
        ...state,
        local: {...action.payload.data.local, _id: action.payload.data._id},
      }

    case 'LOCAL_SIGNUP_REJECTED':
      return { ...state, busy: false, error: action.payload.response.data.error }

    case 'LOGIN_PENDING':
      return { ...state, busy: true }

    case 'LOGIN_FULFILLED':
      // save token to localStorage
      Auth.authenticateUser(action.payload.data.token);
      return {
        ...state,
        busy: false,
        ...cleanData(action.payload.data.user),
        userEmail: action.payload.data.user.local.email,
      }

    case 'LOGIN_REJECTED':
      // delete token in localStorage
      Auth.deauthenticateUser();
      return { ...state, busy: true, error: action.payload.response.data.error};

    case 'SOCIAL_LOGIN_PENDING':
      return { ...state, busy: true};

    case 'SOCIAL_LOGIN_FULFILLED':
      Auth.authenticateUser(action.payload.data.token);
      provider = providers
        .filter(socialProvider => socialProvider in action.payload.data.user)[0]
      return {
        ...state,
        busy: false,
        [provider]: action.payload.data.user[provider],
        userEmail: action.payload.data.user[provider].email
      };

    case 'SOCIAL_SIGNUP_FULFILLED':
      //TODO: handle other providers
      provider = providers
        .filter(socialProvider => socialProvider in action.payload.data.user)[0]
      return {
        ...state,
        busy: false,
        //error: action.payload.data
        [provider]: { ...action.payload.data.token },
      }

    case 'SOCIAL_CONNECT_FULFILLED':
      return {
        ...state,
        ...cleanData(action.payload.data.user)
      }

    case 'SOCIAL_UNLINK_FULFILLED':
      //Auth.deauthenticateUser();
      return {
        ...state,
        ...cleanData(action.payload.data.user)
       };

    case 'LOGOUT':
      Auth.deauthenticateUser();
      return {
        ...userInitialState,
        redirectTo: '/'
      }

    default:
      return state;
  }
};

export default user;
