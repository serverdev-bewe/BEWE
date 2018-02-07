import React, { Component } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchPurchasedLists } from 'actions/store/StoreAction';

import GameCard from './GameCard';

class UserGame extends Component {
  componentWillMount(){
    this.props.fetchPurchasedLists();    
  }

  renderGames(){
    return this.props.games
      .map((game) => {
        return (         
          <GameCard game={game} key={game.idx}/>
        )       
    });
  }

  render(){
    return(
      <div>
        {this.renderGames()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { games: state.store.all }
}

export default connect(mapStateToProps, { fetchPurchasedLists })(UserGame);