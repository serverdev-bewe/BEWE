import React, { Component } from 'react';

import { HashLoader } from 'react-spinners';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchGameHasUserRank } from 'actions/ranks/GameRankAction';
import { fetchUserHasGameRank } from 'actions/ranks/UserRankAction';

import RankingItem from './RankingItem';
import RankingMyInfo from './RankingMyInfo';

class RankingList extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.fetchUserHasGameRank();
  }

  componentWillUpdate(nextProps) {
    if (this.props.type !== nextProps.type) {
      if (nextProps.type === 'game') {
        this.props.fetchGameHasUserRank();
      } else if (nextProps.type === 'user') {
        this.props.fetchUserHasGameRank();
      }
    }
  }

  renderTable(){
    return (
      <Table striped className="ranking-table">
        <thead className="ranking-table-thead">
          <tr>
            <th width="15%">RANK</th>
            <th width="70%">{(this.props.type === 'game' ? "GAME" : "USER")}</th>
            <th width="15%">POINT</th>
          </tr>
        </thead>     
        <tbody>
          {this.renderItems()}
        </tbody>   
      </Table>
    )
  }

  renderItems(){    
    return this.props.list.all
      .map((item, index) => {
        return (
          <RankingItem item={item} type={this.props.type} key={index} />
        )
      });              
  }

  render() {    
    if (!this.props.list.all) {
      return (
        <div className="dashboard-loader">
          <HashLoader
            color={'#00B0FF'} 
            loading={true} 
          />
          <p>랭킹 정보를 로딩하고 있습니다.</p>
        </div>
      )
    } else {
      return (
        <div>
          {(this.props.type === 'user' && localStorage.getItem('token') ? <RankingMyInfo user={this.props.list.currentUser} /> : '')}
          {this.renderTable()}          
        </div>
      )
    }
  }
}


function mapStateToProps(state){
  return { list: state.ranks.list }
}

export default connect(mapStateToProps, { fetchGameHasUserRank, fetchUserHasGameRank })(RankingList);