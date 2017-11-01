const tcctInitialState = {tho: []};

const tcct = (state=tcctInitialState, action, userData) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_THO_PENDING':
      return { ...state }
    case 'ADD_THO_FULFILLED':
      //console.log(payload.data)
      return { ...state, tho: [...state.tho, payload.data] }
    case 'ADD_THO_REJECTED':
      return { ...state }
    case 'SAVE_DRAFT_THO':
      return { ...state, draft: payload }

    case 'GET_THO_PENDING':
      return { ...state, busy: true }
    case 'GET_THO_FULFILLED':
      return { ...state, busy: false, tho: payload.data }
    case 'GET_THO_REJECTED':
      return { ...state };

    default:
      return { ...state, user: userData };

  }
}

export default tcct;
