import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { fetchStoreLists } from 'actions/store/StoreAction';
import { GameCard } from 'components/users/dashboard/profile/GameCard';

class JumbotronB extends Component{
  componentWillMount(){
    this.props.fetchStoreLists();
  }

  renderGames(){
    if (this.props.contents.length === 0) {
      return (
        <div className="dashboard-loader">
          <img src="/../public/img/empty.png" />
          <p>등록된 게임이 없습니다!</p>
        </div>
      )
    } else {
      console.log(2);      
      return this.props.contents
        .map((game) => {
          return (         
            <GameCard game={game} key={game.idx}/>
          )       
      });
    }    
  }

  render(){
    console.log(this.props.contents.length);
    return (
      <div>
        <Jumbotron style={{marginTop:"30px", padding:"20px !important"}}>        
          <div className="ranking-top-menu">
            <h3 className="ranking-middle-text" style={{padding: "0 !important"}}>등록된 게임 목록</h3>
          </div>
          <div>
            {this.renderGames()}
          </div>
        </Jumbotron>
      </div>
    );
  }
    
};


function mapStateToProps(state) {
  return { contents: state.store.all }
}

export default connect(mapStateToProps, { fetchStoreLists })(JumbotronB);
