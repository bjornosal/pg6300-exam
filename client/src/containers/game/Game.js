import React, { Component } from "react";
import { connect } from 'react-redux';
import socketClient from 'socket.io-client';

class Game extends Component {

  componentWillMount = () => {
    const socket = socketClient(window.location.origin);


    
  }

  
  render() {
    return (
      <div className="gameContainer">
      </div>
    );
  }
}

export default connect()(Game)