import React, { Component } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getConversations } from '../../../../actions/users/MessageActions';

class ConversationList extends Component {
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
    this.props.getConversations();    
  }

  renderConversations(){
    return this.props.conversations
      // .slice(0, 15 * this.state.page - 1)
      .map((conversation) => {
        // if(this.props.type === 'all') {
          return (         
            {conversation.idx}
            // <Friend friend={friend} key={friend.idx}/>
          )
         // } else {
          // if(noti.flag == 0) {
          //   return (
          //     <Noti friend={noti} key={noti.idx}/>
          //   )
          // }
        // }
    });
  }

  render() {
    if(this.props.conversations === undefined) {
      return <div>Loading...</div>
    }

    else {
      {this.renderConversations()}
      // if(this.props.friends.length > this.state.page * 15) {
      //   return(
      //     <div>
      //       {this.renderFriends()}
      //       <button className="noti-more-button" onClick={this.onClickButton}>더 보기</button>
      //     </div>
      //   )
      // } else {
      //   return(
      //     <div>
      //       {this.renderFriends()}
      //     </div>
      //   )
      // }
    }    
  }
}

function mapStateToProps(state){
  return { conversations: state.messages.conversations }
}

export default connect(mapStateToProps, { getConversations })(ConversationList);