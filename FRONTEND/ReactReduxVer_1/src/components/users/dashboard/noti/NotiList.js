import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { fetchNoties } from '../../../../actions/users/NotiActions';
import Noti from './Noti';

const fadeDuration = 10;

class NotiList extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: this.props.page
    }

    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton() {
    this.setState({
      page: this.state.page + 1
    })
  }

  componentWillMount(){
    this.props.fetchNoties();    
  }

  renderNoties(){
    return this.props.noties
      .reverse()
      .slice(0, 15 * this.state.page - 1)
      .map((noti) => {
        if(this.props.type) {
          return (         
            <Noti noti={noti} key={noti.idx}/>
          )
        } else {
          if(noti.flag == 0) {
            return (
              <Noti noti={noti} key={noti.idx}/>
            )
          }
        }
    });
  }

  render() {
    if(this.props.noties === undefined) {
      return <div>Loading...</div>
    }

    else {
      if(this.props.noties.length > this.state.page * 15) {
        return(
          <div>
            {this.renderNoties()}
            <button className="noti-more-button" onClick={this.onClickButton}>더 보기</button>
          </div>
        )
      } else {
        return(
          <div>
            {this.renderNoties()}
          </div>
        )
      }
    }    
  }
}
function mapStateToProps(state){
  return { noties: state.noties.all }
}

export default connect(mapStateToProps, { fetchNoties })(NotiList);