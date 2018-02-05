import React, { Component } from 'react';
import axios from 'axios';


class ContentsRegister extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  };


  onSubmit(e){
    console.log(123);
    e.preventDefault();

    const inputData = {
      title: e.target.title.value,
    };

    const requestData = {
      headers: {
        token: JSON.parse(localStorage.getItem('token'))
      },
      body: {
        inputData
      }
    };
    console.log(requestData.headers.token);

    const ROOT_URL = 'http://127.0.0.1:3003/api';
    axios.post(`${ROOT_URL}/cms/register`, requestData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert(error)
      })


  }

  render(){
    return(
      <form onSubmit={this.onSubmit.bind(this)} method="post">
        <div>
          <h3>Create a New Game</h3>
          <p>title: <input type="text" id="title" name="title"/></p>
          <p>genre: <input type="text"/></p>
          <p>description: <input type="text"/></p>
          <p>image: <input type="file"/></p>
        </div>

        <button type="submit" className="btn"> Submit </button>
      </form>
    );
  }
}

export default ContentsRegister;