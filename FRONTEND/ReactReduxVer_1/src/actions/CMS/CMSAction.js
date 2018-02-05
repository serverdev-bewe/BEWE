'use strict';

import axios from 'axios';

export const FETCH_CONTENTS = 'FETCH_CONTENTS';
export const FETCH_POST = 'FETCH_POST';

const ROOT_URL = 'http://127.0.0.1:3003/api/cms';


exports.fetchContents = () => {
  const request = axios.get(ROOT_URL, {
    headers: {
      'token': JSON.parse(localStorage.getItem('token'))
    }
  });

  return {
    type: FETCH_CONTENTS,
    payload: request
  }
};


exports.createContent = (props) => {
  const request = axios.post(`${ROOT_URL}/register`, props);

  return {
    type: FETCH_POST,
    payload: request
  }
};