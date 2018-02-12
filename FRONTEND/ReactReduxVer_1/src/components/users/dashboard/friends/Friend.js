import React, { Component } from 'react';
import Moment from 'react-moment';
import Parser from 'html-react-parser';
import axios from 'axios';

import { connect } from 'react-redux';

import { fetchOtherId, fetchOtherProfile } from 'helper';
import FriendAllCard from './FriendAllCard';
import FriendRequest from './FriendRequest';

let otherUserIdx = '';

class Friend extends Component {
  constructor(props){
    super(props);
    
    const userIdx = JSON.parse(localStorage.getItem('profile')).idx;
    
    if(props.friend.sender_idx === userIdx) {
      otherUserIdx = props.friend.receiver_idx;
    } else if(props.friend.receiver_idx === userIdx) {
      otherUserIdx = props.friend.sender_idx;
    }  

    this.state = {
      profile: ''
    }
  }

  // this.onCheckNoti = this.onCheckNoti.bind(this);    

  // onCheckNoti() {
  //   console.log(this.props.noti.idx);
  //   if(this.props.checkNoti(this.props.noti.idx)) {
  //     this.context.router.history.push(this.props.noti.url);
  //   }
  // }

  async componentWillMount() {
    let profile = '';

    if (this.props.type === 'all') {
      profile = await fetchOtherProfile(otherUserIdx);
    } else {
      profile = await fetchOtherId(otherUserIdx);
    }

    this.setState({
      profile: profile.data.result
    });
  }

  render(){
    if (this.state.profile === undefined) {
      return <div>Loading...</div>
    } else {
      if (this.props.type === 'all') {
        return (
          <FriendAllCard profile={this.state.profile} />
        )
      } else {
        return (
          <FriendRequest profile={this.state.profile} />
        )
      }
    }
  }
}

export default Friend;
