import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/users'; 
const ROOT_URL = 'http://127.0.0.1:3002/api/store';

exports.fetchOtherProfile = async (idx) => {
  let result = '';

  await axios.get(`${API_URL}/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});
    
  return result;
}


exports.fetchFriendsGameLists = async (idx) => {
  let result = '';

  await axios.get(`${ROOT_URL}/friends/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});

  return result;
}