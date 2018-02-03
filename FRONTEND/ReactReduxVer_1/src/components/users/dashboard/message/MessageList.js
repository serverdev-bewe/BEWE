import React, { Component } from 'react';
import { default as Fade } from 'react-fade';

import { connect } from 'react-redux';

import { getMessages } from '../../../../actions/users/MessageActions';
import Message from './Message';

const fadeDuration = 0.5;

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: 1,
      fadeOut: false,
      userIdx: JSON.parse(localStorage.getItem('profile')).idx
    };

    this.renderMessages = this.renderMessages.bind(this);
  }

  componentWillMount(){
    this.props.getMessages(this.props.conversationIdx);  
  }

  componentWillUpdate(prevProps, nextProps){
    if (this.props.conversationIdx !== prevProps.conversationIdx) {
      this.props.getMessages(prevProps.conversationIdx);  
      
      setTimeout(() => {
        this.setState({
          fadeOut: false
        })
      }, fadeDuration);

      this.setState({
        fadeOut: true
      });
    }    
  }

  renderMessages(){
    return this.props.messages
      // .slice(0, 15 * this.state.page - 1)
      .map((message) => {
        if(this.state.userIdx === message.sender_idx) {
          return (      
            <Message message={message} key={message.idx} sender={"me"} />
          )
        } else if(this.state.userIdx === message.receiver_idx) {
          return (      
            <Message message={message} key={message.idx} sender={"you"} />
          )
        }        
      });
  }

  render() {
    if(this.props.messages === undefined) {
      return <div>Loading...</div>
    }

    else {
      return(
        <div className="message-list-right-wrapper">
          <div className="message-list-top">
            <span>To: 
              <span className="name">{this.props.conversationNickname}</span>
            </span>
          </div>
          <div className="message-list-chat-wrapper">
            <Fade
              out={this.state.fadeOut}
              duration={fadeDuration}>

              {this.renderMessages()}
            </Fade>
          </div>
          <div className="message-write">
            <input className="message-text" type="text" />
            <a><span className="ion-ios-paperplane-outline"></span></a>
          </div>
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
  return { messages: state.messages.messages }
}

export default connect(mapStateToProps, { getMessages })(MessageList);