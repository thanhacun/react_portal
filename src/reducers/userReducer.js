import Auth from '../utils/Auth';

const userInitialState = {
  userEmail: null,
  busy: false,
  error: null,
  local: {},
  facebook: {},
  google: {},
};
const providers = ['local', 'facebook', 'google'];
let [userData, userEmail] = [null, {}, null]

const cleanData = (rawData) => {
  // helper function return cleaned user data (without _id and __v)
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
  // clean userData and get userEmail
  if (action.payload && action.payload.data && action.payload.data.user) {
    userData = cleanData(action.payload.data.user);

    userEmail = providers.reduce((accResult, provider) => {
      if (userData.hasOwnProperty(provider) && userData[provider].email) {
        accResult =  userData[provider].email;
      }
      return accResult;
    }, null);
  }

  switch (action.type) {

    // ==========================================
    // ALL PENDING ACTIONS RETURN THE SAME OBJECT
    // ==========================================
    case 'GET_USER_INFO_PENDING':
    case 'LOCAL_SIGNUP_PENDING':
    case 'LOGIN_PENDING':
    case 'SOCIAL_LOGIN_PENDING':
    case 'SOCIAL_SIGNUP_PENDING':
    case 'SOCIAL_CONNECT_PENDING':
      return { ...state, busy: true };

    // ========================================
    // ALL REJECTED ACTIONS HAVE SAME BEHAVIOR
    // exploit fallthrough
    // ========================================
    case 'GET_USER_INFO_REJECTED':
    case 'LOGIN_REJECTED':
      Auth.deauthenticateUser();
      // eslint-disable-next-line
    case 'LOCAL_SIGNUP_REJECTED':
      return { ...state, busy: false, error: action.payload.response.data.error };

    // =================================
    // LOGIN FULFILLED ACTIONS
    // =================================
    case 'LOGIN_FULFILLED':
    case 'SOCIAL_LOGIN_FULFILLED':
      Auth.authenticateUser(action.payload.data.token);
      // eslint-disable-next-line
    case 'GET_USER_INFO_FULFILLED':
      return { ...state, busy: false, ...userData, userEmail };

    // ========================
    // SIGNUP FULFILLED ACTIONS
    // ========================
    case 'LOCAL_SIGNUP_FULFILLED':
    case 'SOCIAL_SIGNUP_FULFILLED':
    case 'SOCIAL_CONNECT_FULFILLED':
    case 'SOCIAL_UNLINK_FULFILLED':
      return { ...state, busy: false, ...userData };

    // =============
    // OTHER ACTIONS
    // =============
    case 'LOGOUT':
      Auth.deauthenticateUser();
      return { ...userInitialState }

    default:
      return state;
  }
};

export default user;
