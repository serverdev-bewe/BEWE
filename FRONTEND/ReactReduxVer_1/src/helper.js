import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/users'; 

exports.fetchOtherProfile = async (idx) => {
  let result = '';

  await axios.get(`${API_URL}/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});
    
  return result;
}