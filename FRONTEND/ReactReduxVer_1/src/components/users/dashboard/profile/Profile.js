import React from 'react';
import ProfileAvatar from './ProfileAvatar';

const Profile = (props) => {
  return(
    <div>
      <ProfileAvatar url={props.profile.avatar}/>
      {props.profile.idx}
      {props.profile.nickname}
      {props.profile.email}
      {props.profile.created_at}
      {props.profile.id}
    </div>
  )
}

export default Profile;