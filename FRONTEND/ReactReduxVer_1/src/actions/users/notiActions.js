import axios from 'axios';

export const FETCH_NOTIES = 'FETCH_NOTIES';

const API_URL = 'http://127.0.0.1:3001/api/users/noti';

export function fetchNoties(){
  const request = axios.get(API_URL, {
      headers: {
        'token': JSON.parse(localStorage.getItem('token'))
      }
  });  

  console.dir(request.statusCode);
  if (request.statusCode !== 204) {
  return{
    type: FETCH_NOTIES,
    payload: request
  };
}
}