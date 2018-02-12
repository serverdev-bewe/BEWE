import axios from 'axios';

export const FETCH_PURCHASED_LISTS = 'FETCH_PURCHASED_LISTS';

const ROOT_URL = 'http://127.0.0.1:3002/api/store';

export function fetchPurchasedLists(){
  const request = axios.get(`${ROOT_URL}/mylists`, {
    headers: {
      'token': JSON.parse(localStorage.getItem('token'))
    }
  });

  return {
    type: FETCH_PURCHASED_LISTS,
    payload: request
  };
}