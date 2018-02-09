import React, { Component } from 'react';

import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchGameHasUserRank } from 'actions/ranks/GameRankAction';
import { fetchUserHasGameRank } from 'actions/ranks/UserRankAction';

import RankingItem from './RankingItem';

class RankingList extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.fetchGameHasUserRank();
  }

  componentWillUpdate(nextProps) {
    if (this.props.type !== nextProps.type) {
      if (this.props.type) {
        this.props.fetchGameHasUserRank();
      } else {
        this.props.fetchUserHasGameRank();
      }
    }
  }

  renderItems(){
    return this.props.list
      .map((item, index) => {
        return (
          <RankingItem item={item} key={index} />
        )
      });              
  }

  render() {    
    return (
      <Table striped className="ranking-table">
        <thead className="ranking-table-thead">
          <tr>
            <th width="10%">POSITION</th>
            <th width="60%">USER</th>
            <th width="30%">POINT</th>
          </tr>
        </thead>     
        <tbody>
          {this.renderItems()}
        </tbody>   
      </Table>
    )
  }
}


function mapStateToProps(state){
  return { list: state.ranks.list }
}

export default connect(mapStateToProps, { fetchGameHasUserRank, fetchUserHasGameRank })(RankingList);