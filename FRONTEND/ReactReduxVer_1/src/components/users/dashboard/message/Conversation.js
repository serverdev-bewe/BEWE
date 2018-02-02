import '../../users.css'

import React, { Component } from 'react';
import Moment from 'react-moment';
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
        <div className="conversation-list-item" 
             onClick={() => this.props.onConversationClick(this.props.conversation.idx)}>
          <div className="conversation-list-left">
            <div className="noti-avatar-wrapper">
              <img className="avatar-image" src={(this.state.profile.avatar) !== null ? this.state.profile.avatar : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"}/>
            </div>
          </div>

          <div className="conversation-list-right">
            <p className="conversation-list-nickname">
              {this.state.profile.nickname}
            </p>
            <p className="conversation-list-date">
              <Moment fromNow locale="ko">{this.props.conversation.updated_at}</Moment>
              <Moment format="YYYY/MM/DD">{this.props.conversation.updated_at}</Moment>
            </p>            
          </div>
          <p className="conversation-list-last-message">
            {this.props.conversation.last_message}
          </p>
        </div>
      )
    }
  }
}

export default Conversation;