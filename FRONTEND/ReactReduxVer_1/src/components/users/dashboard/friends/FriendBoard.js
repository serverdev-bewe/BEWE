import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import FriendList from './FriendList';

const fadeDuration = 0.5;

export default class FriendBoard extends Component {
  constructor(props){
    super(props);

    this.state = {
      type: 'all',
      fadeOut: false
    }
  }

  componentWillUpdate(nextProps, { fadeOut }) {
    if (fadeOut) {
      setTimeout(() => {
        this.setState({
          fadeOut: false
        })
      }, fadeDuration);
    }
  }

  handleButtonChange(value) {
    this.setState({
      type: value,
      fadeOut: true
    });
  }
 
  render() {
    return (      
      <div style={{"height":"100%", "padding": "30px"}}>
        <Fade
          out={this.state.fadeOut}
          duration={fadeDuration}
        >
          <FriendList type={this.state.type} />
        </Fade>
      </div>
    )
  }
}