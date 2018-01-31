import React, { Component } from 'react';
import { default as Fade } from 'react-fade'

import { connect } from 'react-redux';
import { fetchProfile } from '../../../../actions/users/UserActions';

import ProfileAvatar from './ProfileAvatar';
import Profile from './Profile';
import UserGame from './UserGame';

const fadeDuration = 0.5;

class ProfileBoard extends Component{
  constructor(props){
    super(props);

    this.state = {
      type: true
    }

    this.onClickButtonAll = this.handleButtonChange.bind(this, true);
    this.onClickButtonUnchecked = this.handleButtonChange.bind(this, false);
  }

  componentWillMount(){
    this.props.fetchProfile();    
  }

  handleButtonChange(value) {
    this.setState({
      type: value
    });
  }

  renderResult(){
    if(this.state.type) {
      return <Profile profile={this.props.profile} />
    } else {
      return <UserGame />
    }
  }

  render(){
    return(
      <div style={{"height":"100%", "padding": "30px"}}>
        <Fade duration={fadeDuration}>
          <div className="tab-slider-nav">
            <ul className="tab-slider-tabs">
              <li className={`tab-slider-item ${(this.state.type) ? 'tab-active' : ''}`} onClick={this.onClickButtonAll}>내 정보</li>
              <li className={`tab-slider-item ${(this.state.type) ? '' : 'tab-active'}`} onClick={this.onClickButtonUnchecked}>내 게임</li>
            </ul>
          </div>  
          {this.renderResult()} 
        </Fade>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { profile: state.user.profile }
}

export default connect(mapStateToProps, { fetchProfile })(ProfileBoard);