import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to={"/game"}>Go to a game</Link>
        <Footer/>
      </div>

    )
  }
}
