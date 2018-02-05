import React, { Component } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getConversations, getNewMessage, makeNotUpdate } from '../../../../actions/users/MessageActions';
import Conversation from './Conversation';

class ConversationList extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: 1
    };

    this.renderConversations = this.renderConversations.bind(this);
  }

  componentWillMount(){
    this.props.getConversations();    
  }

  componentWillUpdate(nextProps){
    if(this.props.newMessage !== nextProps.newMessage || nextProps.update){
      this.props.getConversations();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.update){
      this.props.makeNotUpdate();
    }
  }
  
  renderConversations(){
    return this.props.conversations
      // .slice(0, 15 * this.state.page - 1)
      .map((conversation) => {
        if(this.props.conversationIdx === conversation.idx) {
          return (
            <Conversation 
              flag={1}
              onConversationClick={this.props.onConversationSelect}
              conversation={conversation} 
              key={conversation.idx} />
          )
        } else {
          return (
            <Conversation 
              flag={0}
              onConversationClick={this.props.onConversationSelect}
              conversation={conversation} 
              key={conversation.idx} />
          )
        }
    });
  }

  render() {
    if(this.props.conversations === undefined) {
      return <div>Loading...</div>
    }

    else {
      return(
        <div>
          {this.renderConversations()}
        </div>
      )
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
  return { 
    conversations: state.messages.conversations,
    update: state.messages.update, 
    newMessage: state.app.newMessage 
  }
}

export default connect(mapStateToProps, { getConversations, makeNotUpdate })(ConversationList);