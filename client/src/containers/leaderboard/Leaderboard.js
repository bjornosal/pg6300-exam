import React, { Component } from 'react'
// import { connect } from 'react-redux'

export default class Leaderboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scores: []
    }
  }

  componentDidMount = () => {
    this.getLeaderboardInfo();
  }

  doGetScores = async () => {
    const url = "/api/scores";
    let response;
    try {
      response = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (err) {
      return;
    }
  
    return response;
  };

  getLeaderboardInfo = () => {
    return this.doGetScores().then(res => {
      if(res.status === 200) {
        res.json().then(body => {
          this.setState({ scores:  body});
        })
      }
    })
  }

  render() {
    return (
      <div className="leaderboardContainer">
        <h2>Leaderboard</h2>
      </div>
    )
  }
}

