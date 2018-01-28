import React, { Component } from 'react';

class RoomReadyBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        let joinUsers = this.props.userList.map((contact, i) => {
            return (
                <JoinUsers name={contact.name} key={i}/>
            );
        })
        return (
            <div>
                <ol>
                {joinUsers}
                </ol>
            </div>
        );
    }
}


class JoinUsers extends Component {
    render() {
        return (
            <li>{this.props.name}</li>
        );
    }
}

export default RoomReadyBar;