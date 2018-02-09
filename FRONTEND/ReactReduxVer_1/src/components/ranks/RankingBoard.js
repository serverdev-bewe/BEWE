import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

class RankingBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
  render() {
    console.log('asdf');
    let height = this.state.height - 60;

    return(
      <div className="container" 
           style={{"backgroundColor": "white", "padding": "0", 
                   "minHeight": height, "height": "100%"}}>    
      </div>
    )
  }
}

export default RankingBoard;