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

export default function(state=userInitialState, action){
  switch (action.type) {
    case 'GET_USER_INFO_PENDING':
      return { ...state, busy: true }

    case 'GET_USER_INFO_FULFILLED':
      //handle case of local vs socials: facebook, google, ...
      //payload data consists only one account type
      const userData = {...action.payload.data};
      const userAccType = ['local', 'facebook', 'google', 'twitter'].filter(accountType => accountType in userData)[0];

      return {
        ...state,
        busy: false,
        ...action.payload.data,
        [userAccType]: {...action.payload.data[userAccType], _id: action.payload.data._id},
        userEmail: action.payload.data[userAccType].email
      }

    case 'GET_USER_INFO_REJECTED':
      //Auth.deauthenticateUser();
      return {
        ...state,
        busy: false,
        error: action.payload.message,
        errMessage: action.payload.message
      }

    case 'LOCAL_SIGNUP_PENDING':
      return { ...state, busy: true}

    case 'LOCAL_SIGNUP_FULFILLED':
      return {
        ...state,
        local: {...action.payload.data.local, _id: action.payload.data._id},
        errMessage: action.payload.data.errMessage || '',
        userEmail: action.payload.data.local.email
      }

    case 'LOCAL_SIGNUP_REJECTED':
      return { ...state, busy: false, error: action.payload.message }

    case 'LOGIN_PENDING':
      return { ...state, busy: true }

    case 'LOGIN_FULFILLED':
      // save token to localStorage
      Auth.authenticateUser(action.payload.data.token);
      return {
        ...state,
        busy: false,
        errMessage: action.payload.data.errMessage,
        local: { ...action.payload.data.user.local },
        userEmail: action.payload.data.user.local.email,
        redirectTo: '/profile'
      }

    case 'LOGIN_REJECTED':
      // delete token in localStorage
      Auth.deauthenticateUser();
      return { ...state, busy: true, error: action.payload.message};

    case 'SOCIAL_LOGIN_PENDING':
      return { ...state, busy: true};

    case 'SOCIAL_LOGIN_FULFILLED':
      Auth.authenticateUser(action.payload.data.token);
      return {
        ...state,
        busy: false,
        errMessage: action.payload.data.errMessage,
        facebook: { ...action.payload.data.user.facebook },
        userEmail: action.payload.data.user.facebook.email
      };

    case 'SOCIAL_SIGNUP_FULFILLED':
      //TODO: handle other providers
      const provider = ['facebook', 'google', 'twitter']
        .filter(socialProvider => socialProvider in action.payload.data.token)[0]
      return {
        ...state,
        busy: false,
        //error: action.payload.data
        [provider]: { ...action.payload.data.token },
      }

    case 'SOCIAL_CONNECT':
      return {...state}

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
