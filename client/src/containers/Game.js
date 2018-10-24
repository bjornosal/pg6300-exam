import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Game extends Component {
  render() {
    return (
      <div>
        <h2>Game</h2>
        <Link to={"/game"}>Go back home</Link>
      </div>
    )
  }
}
