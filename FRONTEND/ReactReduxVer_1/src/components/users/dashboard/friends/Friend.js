import '../../users.css'

import React, { Component, PropTypes } from 'react';
import Moment from 'react-moment';
import Parser from 'html-react-parser';
import { Card, CardTitle, CardBody, CardSubtitle, CardText, Button } from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfile } from '../../../../actions/users/UserActions';

const icon = (type) => {
  if (type === 'friend') {
    return (<span className="ion-person-add noti-list-icon" />)
  }
}

class Friend extends Component {
  constructor(props){
    super(props);

    // this.onCheckNoti = this.onCheckNoti.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    this.props.fetchProfile();    
  }

  // onCheckNoti() {
  //   console.log(this.props.noti.idx);
  //   if(this.props.checkNoti(this.props.noti.idx)) {
  //     this.context.router.history.push(this.props.noti.url);
  //   }
  // }

  render(){
    console.log(this.props.profile);
    return(
      
      <Card>
        <div className="noti-avatar-wrapper">
          <img className="avatar-image" src={(this.props.profile.avatar) !== null ? this.props.profile.avatar : "http://genknews.genkcdn.vn/zoom/220_160/2017/thumbnail-4x3-34722014736-2d241425f9-k-1495531031736-crop-1495531041612.jpg"}/>
        </div>

        <CardBody>
          <CardTitle>{this.props.profile.nickname}</CardTitle>
          <CardSubtitle>{this.props.profile.id}</CardSubtitle>
          <CardText>{this.props.profile.email}</CardText>
          <Button >프로필 보기</Button>
        </CardBody>      
        
      </Card>
    )
  }
}

function mapStateToProps(state){
  return { profile: state.user.profile }
}

export default connect(mapStateToProps, { fetchProfile })(Friend);