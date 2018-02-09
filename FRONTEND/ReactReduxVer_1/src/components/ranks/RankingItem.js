import '/../style/ranks.css';

import React from 'react';

const RankingItem = (props) => {
  return (
    <tr className="ranking-item-wrapper">
      <td>{props.item.rank}</td>
      <td>{props.item.users_idx}</td>
      <td>{props.item.count}</td>
    </tr>
  )
}

export default RankingItem