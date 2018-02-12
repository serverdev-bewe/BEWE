import React from 'react';

const FriendRequest = (props) => {
  return (
    <div className="friend-request-card-wrapper">
      <div className="friend-avatar-wrapper">
        <img className="avatar-image" src={(props.profile.avatar) !== null 
          ? props.profile.avatar : "/../public/img/avatar.png"}/>
      </div>
      {props.profile.id}
      {props.profile.created_at}
    </div>
  )
}

export default FriendRequest;