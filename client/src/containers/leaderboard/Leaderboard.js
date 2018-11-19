import React, { Component } from 'react'
// import { connect } from 'react-redux'

export default class Leaderboard extends Component {


  
  render() {
    return (
      <div className="leaderboardContainer">
        <h2>Leaderboard</h2>
      </div>
    )
  }

  //TODO: 19.11
}

//TODO: Implement a leaderboard. Use the quiz query and print them all out. 
const checkLoggedInState = async () => {
  const url = "/api/user";
  // const payload = { username: values.username, password: values.password };
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

