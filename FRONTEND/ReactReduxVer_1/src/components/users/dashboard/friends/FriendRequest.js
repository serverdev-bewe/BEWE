import React from 'react';
import Moment from 'react-moment';
import { Button } from 'reactstrap';

const FriendRequest = (props) => {
  console.log(props.type);
  return (
    <div className="friend-request-card-wrapper">
      <div className="friend-request-card-avatar-wrapper">
        <img className="avatar-image" src={(props.profile.avatar) !== null 
          ? props.profile.avatar : "/../public/img/avatar.png"}/>
      </div>
      <p className="friend-request-card-id">{props.profile.id}</p>
      <p className="friend-request-card-date">
        <Moment format="YYYY/MM/DD" style={{"marginRight": "10px"}}>
          {props.profile.created_at}
        </Moment>
        (<Moment fromNow locale="ko" style={{"color": "#666666"}}>
          {props.profile.created_at}
        </Moment>)
      </p>

      <Button className={`friend-request-button ${(props.type === 'send') ? 'cancel' : 'accept'}`}>
        {(props.type === 'send') ? '요청 취소' : '친구 수락'}
      </Button>
    </div>
  )
}

export default FriendRequest;