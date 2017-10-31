import axios from 'axios';

export function addTho(newTho){
  return {
    type: 'ADD_THO',
    payload: axios.post('/api/tcct/tho', newTho)
  }
};

export function saveDraftTho(newTho){
  return {
    type: 'SAVE_DRAFT_THO',
    payload: newTho
  }
};

export function getTho(){
  return {
    type: 'GET_THO',
    payload: axios.get('/api/tcct/tho')
  }
}
