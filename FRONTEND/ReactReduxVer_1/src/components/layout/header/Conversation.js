import '../../users/users.css';

import React, { Component } from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

let otherUserIdx = '';
const API_URL = 'http://127.0.0.1:3000/api/users';

const fetchOtherProfile = async (idx) => {
  let result = '';

  await axios.get(`${API_URL}/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});
    
  return result;
}

class Conversation extends Component {
  constructor(props){
    super(props);

    const userIdx = JSON.parse(localStorage.getItem('profile')).idx;  

    if(this.props.conversation.users_idx_1 === userIdx) {
      otherUserIdx = this.props.conversation.users_idx_2;
    } else if(this.props.conversation.users_idx_2 === userIdx) {
      otherUserIdx = this.props.conversation.users_idx_1;
    }

    this.state = {
      profile: ''
    }
  }

  async componentWillMount(){
    const profile = await fetchOtherProfile(otherUserIdx);

    this.setState({
      profile: profile.data.result
    });
  }
  
  render(){
    if(this.state.profile === undefined) {
      return <div>Loading...</div>
    } else {
      return (
        <NavLink to={`/users/messages`} 
            className={`header-conversation-list-item ${(this.props.flag) ? 'active' : ''}`}
            onClick={() => this.props.onConversationClick(
            this.props.conversation.idx, this.state.profile.nickname)}
            style={{"padding":10, "minWidth":250}}>
          <div className="conversation-list-left">
            <div className="noti-avatar-wrapper" style={{"width":40, "height":40}}>
              <img className="avatar-image" src={(this.state.profile.avatar) !== null ? this.state.profile.avatar : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"}/>
            </div>
          </div>

          <div className="conversation-list-right">
            <p className="conversation-list-nickname">
              {this.state.profile.nickname} &nbsp;
              <Moment fromNow locale="ko" 
                style={{"fontWeight": "normal", "fontSize": "12px"}}>
                  {this.props.conversation.updated_at}
              </Moment>
            </p>   
            <p className="conversation-list-last-message">
              {this.props.conversation.last_message}   
            </p>
            </div>          
        </NavLink>
      )
    }
  }
}

export default Conversation;