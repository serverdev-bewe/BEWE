import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import RankingMenu from './RankingMenu';
import RankingList from './RankingList';

class RankingBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0,
      type: true
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onClickButtonGame = this.handleButtonChange.bind(this, true);
    this.onClickButtonUser = this.handleButtonChange.bind(this, false);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleButtonChange(value) {
    this.setState({
      type: value,
      fadeOut: true
    });
  }
  
  render() {
    let height = this.state.height - 60;

    return(
      <div className="container" 
           style={{"minHeight": height, "height": "100%"}}> 
        <div className="ranking-board-wrapper">
          <RankingMenu type={this.state.type} 
            onGameClick={this.onClickButtonGame} 
            onUserClick={this.onClickButtonUser} />   
          <RankingList type={this.state.type} />       
        </div>
      </div>
    )
  }
}

export default RankingBoard;