"use strict";

import axios from 'axios';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';

const API_URL = 'http://127.0.0.1:3001/api/users/friends';

export function fetchFriends(){  
  const request = axios.get(API_URL, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}});
  
  return{
    type: FETCH_FRIENDS,
    payload: request
  };
}

// export function checkNoti(idx){
//   const request = axios.get(`${API_URL}/${idx}`,
//     {headers: {'token' : JSON.parse(localStorage.getItem('token'))}});

//   return{
//     type: CHECK_NOTI
//   }
// }