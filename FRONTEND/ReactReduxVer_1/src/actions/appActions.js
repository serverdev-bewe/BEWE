"use strict";

import axios from 'axios';

export const FETCH_NOTIES_BEGIN = 'FETCH_NOTIES_BEGIN';
export const FETCH_NOTIES_SUCCESS = 'FETCH_NOTIES_SUCCESS';
export const FETCH_NOTIES_FAIL = 'FETCH_NOTIES_FAIL';

const API_URL = 'http://127.0.0.1:3001/api/users/noti/polling';

export function dataFetch() {;
  const request = axios.get(API_URL, {headers: {'token' : JSON.parse(localStorage.getItem('token'))}});

  console.log("dataFetch", request)

  return {    
    type: [FETCH_NOTIES_BEGIN, FETCH_NOTIES_SUCCESS, FETCH_NOTIES_FAIL],
    payload: request
  }
}