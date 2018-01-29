import React, { Component } from 'react';

class GameRoomCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.createGameRoom = this.createGameRoom.bind(this);
    }
    createGameRoom(e){
        e.preventDefault();

    }
    render() {
        return (
            <div className="createGameRoomForm">
                <h1>Try creating a Game Room!</h1><br/>
                <from onSubmit={this.createGameRoom} >
                    <h2> 방 이름 : <input type="text" name="name" /></h2>
                    <h2> 인원수 : <input type="text" name="size" /></h2>
                    <br/>
                    <input type="submit" value="만들기" />
                </from>
            </div>
        );
    }
}

export default GameRoomCreate;