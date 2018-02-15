import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashLoader } from 'react-spinners';
import Friend from './Friend';

class FriendFindList extends Component {
  constructor(props) {
    super(props);
  }

  renderFriends() {
    return this.props.friends.result
    // .slice(0, 15 * this.state.page - 1)
    .map((friend) => {
      return (
        <Friend friend={friend} key={friend.idx} type="find" />
      )
    });
  }

  render() {
    if (this.props.friends === undefined || this.props.friends.result === undefined) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>친구 리스트를 로딩하고 있습니다.</p>
        </div>
      )
    } else if (this.props.friends.result.length === 0) {
      return (
        <div className="dashboard-loader">
          <img src="/../public/img/empty.png" />
          <p>해당 ID를 가진 친구가 없습니다!</p>
        </div>
      )
    } else {
      return (
        <div className="friend-find-list-wrapper">
          {this.renderFriends()}
        </div>
      )
    }    
  }
}

function mapStateToProps(state){
  return { friends: state.friends.find }
}

export default connect(mapStateToProps, null)(FriendFindList);