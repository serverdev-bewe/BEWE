import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import ConversationList from './ConversationList';
import MessageList from './MessageList';

const fadeDuration = 0.5;

class MessageBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      index: 0,
      conversationIdx: 0
    }
  }

  componentDidUpdate() {
    console.log(this.state.conversationIdx);
  }

  renderMessageList(){
    if(this.state.conversationIdx === 0) {
      return(
        <div>Loading...</div>
      )
    } else {
      return(
        <MessageList conversationIdx={this.state.conversationIdx} />
      )
    }
  }

  render() {
    return (      
      <div className="dashboard-right-contents" 
           style={{"padding":"30px 0"}}>
        <Fade
          duration={fadeDuration}
        >
          <div className="message-left-contents" 
               style={{"height": this.props.height-65}}>
            <ConversationList
              onConversationSelect={selectedConversation => {
                this.setState({
                  conversationIdx: selectedConversation
                });
              }}
              conversationIdx={this.state.conversationIdx}/>
          </div>
          <div className="message-right-contents"
               style={{"height": this.props.height-65}}>
            {this.renderMessageList()}
          </div>
        </Fade>
      </div>
    )
  }
}

export default MessageBoard;