'use strict';

import axios from 'axios';

export const FETCH_CONTENTS = 'FETCH_CONTENTS';

const API_URL = 'http://127.0.0.1:3003/api/cms/register';

export function fetchContents() {
  const request = axios.get(API_URL, {
    headers: {
      'token': JSON.parse(localStorage.getItem('token'))
    }
  });

  return {
    type: FETCH_CONTENTS,
    payload: request
  }
}