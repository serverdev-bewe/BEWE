"use strict";

import axios from 'axios';

export const FETCH_PROFILE = 'FETCH_PROFILE';

const API_URL = 'http://127.0.0.1:3000/api/users';

export function fetchProfile(){
  const request = axios.get(API_URL, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}});
  
  return{
    type: FETCH_PROFILE,
    payload: request
  };
}