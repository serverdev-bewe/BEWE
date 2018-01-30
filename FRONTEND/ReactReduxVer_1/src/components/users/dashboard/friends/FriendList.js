import React, { Component } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchFriends } from '../../../../actions/users/FriendActions';
import Friend from './Friend';

class FriendList extends Component {
  constructor(){
    super();

    this.state = {
      page: 1
    };

    this.onClickButton = this.handleButton.bind(this);
  }

  handleButton() {
    this.setState({
      page: this.state.page + 1
    });
  }

  componentWillMount(){
    this.props.fetchFriends();    
  }

  renderFriends(){
    return this.props.friends
      .slice(0, 15 * this.state.page - 1)
      .map((friend) => {
        if(this.props.type === 'all') {
          return (         
            <Friend friend={friend} key={friend.idx}/>
          )
        } else {
          // if(noti.flag == 0) {
          //   return (
          //     <Noti friend={noti} key={noti.idx}/>
          //   )
          // }
        }
    });
  }

  render() {
    if(this.props.friends === undefined) {
      return <div>Loading...</div>
    }

    else {
      if(this.props.friends.length > this.state.page * 15) {
        return(
          <div>
            {this.renderFriends()}
            <button className="noti-more-button" onClick={this.onClickButton}>더 보기</button>
          </div>
        )
      } else {
        return(
          <div>
            {this.renderFriends()}
          </div>
        )
      }
    }    
  }
}

function mapStateToProps(state){
  return { friends: state.friends.all }
}

export default connect(mapStateToProps, { fetchFriends })(FriendList);