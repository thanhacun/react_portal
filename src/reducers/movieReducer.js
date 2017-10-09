
const moviesInitialState = {
  movies: [],
  busy: false,
  error: null
};

export default function movieReducer(state=moviesInitialState, action) {
  switch (action.type) {
    case 'FETCH_MOVIES_PENDING':
      return {
        ...state,
        busy: true,
      };

    case 'FETCH_MOVIES_FULFILLED':
      return {
        ...state,
        movies: action.payload.data,
        busy: false
      };

    case 'FETCH_MOVIES_REJECTED':
    return {
      ...state,
      busy: false,
      error: action.payload.message
    }

    default:
      return state;
  }
};
