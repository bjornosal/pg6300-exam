import React, { Component } from "react";
import { connect } from 'react-redux';
import io from 'socket.io-client';

class Game extends Component {
  socket; 
  componentWillMount = () => {
    this.socket = io("/games");
    this.socket.on("hostEvent", () => {
      console.log("IM THE HOST")
    })

  }

 
  componentWillUnmount = () => {
    this.socket.close();
  }
  
  render() {
    return (
      <div className="gameContainer">
      </div>
    );
  }
}

export default connect()(Game)