import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { sendFriendRequest, fetchFriends } from 'actions/users/FriendActions';

import { Button } from 'reactstrap';

class FriendFindCard extends Component {
  constructor(){
    super();

    this.onSendFriendRequest = this.onSendFriendRequest.bind(this);
    
    this.state = {
      update: false
    }
  }

  onSendFriendRequest() {
    if (confirm('친구 요청을 전송하시겠습니까?')) {
      this.props.sendFriendRequest(this.props.idx)
        .then(() => {
          this.props.fetchFriends();
        });
    }
  }

  renderButton() {
    return (
      <div>
      <Button className="friend-request-button accept" 
        onClick={this.onSendFriendRequest} 
        style={{"top": "18px !important", "left": "450px !important"}}>
        메시지 전송
      </Button>

      <Button className="friend-request-button cancel" onClick={this.onSendFriendRequest} >
        친구 요청 전송
      </Button>
      </div>
    )
  }

  render() {
    return (
      <div className="friend-request-card-wrapper">
        <div className="friend-request-card-avatar-wrapper">
          <img className="avatar-image" src={(this.props.profile.avatar) !== null 
            ? this.props.profile.avatar : "/../public/img/avatar.png"}/>
        </div>
        <p className="friend-request-card-id">{this.props.profile.id}</p>
        
        {this.renderButton()}
      </div>
    )
  }
}

export default connect(null, 
  { sendFriendRequest, fetchFriends })(FriendFindCard);