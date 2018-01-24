import axios from 'axios';

export const FETCH_NOTIES = 'FETCH_NOTIES';

const API_URL = 'http://127.0.0.1:3001/api/users/noti';

export function fetchNoties(){
  const request = axios.get(API_URL);

  return{
    type: FETCH_NOTIES,
    payload: request
  };
}