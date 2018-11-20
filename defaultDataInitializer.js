const queries = require('./queries')
const queryTexts = require("./databaseQueries");


const rocketLeagueQuestionQueries = quiz_id => {
  queries.createQuestion(
    queryTexts.createNewQuestionQuery,
    quiz_id,
    "What is the highest rank achievable in Rocket League",
    ["Superstar",
      "Grand Master",
      "Grand Champion",
      "Challenger",
      "Tear, Sweat And Blood",
      "Ultimate Challenger",
      "Diamond"],
    2
  );
   queries.createQuestion(
    queryTexts.createNewQuestionQuery,
    quiz_id,
    "What are the default team colors",
    ["Blue and Orange",
      "Blue and Yellow",
      "Black and Yellow",
      "Red and Blue"],
    0
  );
  //TODO: Add questions back.
/*  queries.createQuestion(
    queryTexts.createNewQuestionQuery,
    quiz_id,
    "Who has the nickname 'The Mountain'",
    ["Squishy Muffinz",
      "Kronovi",
      "Mikerules",
      "jstn"],
    1
  );
  queries.createQuestion(
    queryTexts.createNewQuestionQuery,
    quiz_id,
    "Who has won Legend of Rockets twice in a row?",
    ["Kill Bill",
      "John Rummy",
      "Scrub Killa",
      "Post Gresql"],
    2
  ); */
};


module.exports = {
  connectToServerAndCreateTables: () => {
    queries.defaultDataInit(rocketLeagueQuestionQueries)
  }
};
