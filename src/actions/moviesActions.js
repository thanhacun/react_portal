import axios from 'axios';
import Auth from '../utils/Auth';

// export function fetchMovies(dispatch) {
//   dispatch({type: 'FETCH_MOVIES_START', payload: {busy: true}});
//   //why fetch need to be so complicated!
//   fetch('/api/movies')
//   .then(response => response.json())
//   .then((json_data) => {
//     dispatch({type: 'RECEIVE_MOVIES', payload: json_data});
//   })
//   .catch((err) => {
//     dispatch((err) => {
//       dispatch({type: 'FETCH_MOVIES_ERROR', payload: err});
//     })
//   });
//
//   // axios('/api/movies')
//   // .then((response) => {
//   //   dispatch({type:'RECEIVE_MOVIES', payload: response.data})
//   // })
//   // .catch((err) => {
//   //   dispatch({type: 'FETCH_MOVIES_ERROR', payload: err})
//   // });
// }

export function fetchMovies() {
  // if (Auth.isUserAuthenticated()) {
  //   console.log(axios.defaults);
  //   axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;
  // }
  return {
    type: 'FETCH_MOVIES',
    payload: axios.get("/api/movies", {
      headers: {
        authorization: `bearer ${Auth.getToken()}`
      }
    })
  }
}
