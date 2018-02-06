import '/../style/users.css';

import React, { Component } from 'react';
import Moment from 'react-moment';
import Parser from 'html-react-parser';
import axios from 'axios';
import { Card, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchOtherProfile } from 'helper.js';

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
    const profile = await fetchOtherProfile(otherUserIdx);

    this.setState({
      profile: profile.data.result
    });
  }

  render(){
    if(this.state.profile === undefined) {
      return <div>Loading...</div>
    } else {
      return(      
        <Card className="friend-card-wrapper">
          <div className="friend-left-wrapper">
            <CardTitle>{this.state.profile.nickname}</CardTitle>
            <CardSubtitle style={{"margin":"7px 0"}}>{this.state.profile.id}</CardSubtitle>          
            <CardText style={{"color":"#999999", "fontSize":"13px"}}>{this.state.profile.email}</CardText>
          </div>
          <div className="friend-right-wrapper">
            <div className="friend-avatar-wrapper">
              <img className="avatar-image" src={(this.state.profile.avatar) !== null ? this.state.profile.avatar : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"}/>
            </div>
          </div>
          <Button style={{"display" : "block"}}>프로필 보기</Button>  
        </Card>
      )
    }
  }
}

export default Friend;
