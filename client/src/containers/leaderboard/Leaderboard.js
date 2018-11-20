import React, { Component } from "react";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: []
    };
  }

  componentDidMount = () => {
    this.getLeaderboardInfo();
  };

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
      if (res.status === 200) {
        res.json().then(body => {
          this.setState({ scores: body });
        });
      }
    });
  };

  render() {
    return (
      <div className="leaderboardContainer">
        <h2 className="leaderboardHeader">Leaderboard - Top 25 Worldwide</h2>
        <div className="leaderboard">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.scores.map((scoreInfo, index) => (
                <tr className={index % 2 === 0 ? "even" : "odd"} key={index}>
                  <td>{index + 1}</td>
                  <td>{scoreInfo.username}</td>
                  <td>{scoreInfo.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
