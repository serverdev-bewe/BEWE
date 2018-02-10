import React from 'react';

const RankingMyInfo = (props) => {
  if (!props.user) {
    return (
      <div>
        <p style={{
          "marginTop": 15,
          "textAlign": "center",
          "color": "#00B0FF",
          "fontWeight": "600"
        }}>유저 랭킹 정보를 로딩하고 있습니다.</p>
      </div>
    )
  } else {
    return (
      <div className="ranking-my-zone-wrapper">
        <div className="ranking-my-zone-user-avatar-wrapper">
          <img className="avatar-image"           
            src={(props.user.data.avatar) !== null ? 
              props.user.data.avatar : "/../public/img/avatar.png"} />
        </div>
        <div className="ranking-user-info">
          <p>{props.user.data.nickname}</p>
          <p>{props.user.data.email}</p>
        </div>    
      </div>
    )
  }
}

export default RankingMyInfo;