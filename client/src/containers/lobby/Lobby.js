import React, { Component } from 'react'
import { connect } from 'react-redux';
import io from 'socket.io-client';

class Lobby extends Component {

  socket; 
  componentWillMount = () => {
    this.socket = io("/lobby");


  }


  componentWillUnmount = () => {
    this.socket.close();
  }
  render() {
    return (
      <div className="lobbyContainer">
        <h2>Lobby</h2>
      </div>
    )
  }
}
export default connect()(Lobby)
