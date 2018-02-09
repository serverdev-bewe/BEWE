import '/../style/ranks.css';

import React from 'react';

const RankingMenu = (props) => {
  let returnTypeText = '';

  if (props.type) {
    returnTypeText = 'Game Ranking';
  } else {
    returnTypeText = 'User Ranking';
  }

  return (
    <div className="ranking-top-menu">
      <h2 className="ranking-top-text">BeWe Ranks</h2>
      <div className="ranking-top-item-wrapper">
        <button onClick={props.onGameClick} className={`ranking-top-item ${props.type ? 'active' : ''}`}>GAME</button>
        <button onClick={props.onUserClick} className={`ranking-top-item ${props.type ? '' : 'active'}`}>USER</button>
      </div>    

      <hr/>  

      <h3 className="ranking-middle-text">
        {returnTypeText}
      </h3>
    </div>
  )
}

export default RankingMenu;