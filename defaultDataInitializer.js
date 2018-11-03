const pg = require("pg");
const queries = require("./databaseQueries");

const connection =
  process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";

const client = new pg.Client(connection);

const createTableQuery = (queryText, tableName) => {
  client.query(queryText).then(
    res => {
      console.log("TABLE '" + tableName + "' IS SET UP.");
    },
    err => {
      console.error("Issues setting up: ", err);
    }
  );
};

const insertIntoQuizQuery = (queryText, quizname, questionQueries) => {
  client.query(queryText, quizname).then(
    res => {
      questionQueries(res.rows[0].quiz_id);
    },
    err => {
      console.log("Issues inserting: ", err);
    }
  );
};

const insertIntoQuestionQuery = (
  queryText,
  quizId,
  question,
  answer1,
  answer2,
  answer3,
  answer4,
  correct
) => {
  client
    .query(queryText, [
      quizId,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correct
    ])
    .then(res => {
      console.log("INSERTED QUESTION INTO QUIZ WITH ID: ", quizId);
    })
    .catch(err => {
      console.log("INSERT INTO ERROR:", err);
    });
};

const rocketLeagueQuestionQueries = quiz_id => {
  insertIntoQuestionQuery(
    queries.createNewQuestionQuery,
    quiz_id,
    "What is the highest rank achievable in Rocket League",
    "Superstar",
    "Grand Master",
    "Grand Champion",
    "Challenger",
    "3"
  );
  insertIntoQuestionQuery(
    queries.createNewQuestionQuery,
    quiz_id,
    "What are the default team colors",
    "Blue and Orange",
    "Blue and Yellow",
    "Black and Yellow",
    "Red and Blue",
    "1"
  );
  insertIntoQuestionQuery(
    queries.createNewQuestionQuery,
    quiz_id,
    "Who has the nickname 'The Mountain'",
    "Squishy Muffinz",
    "Kronovi",
    "Mikerules",
    "jstn",
    "2"
  );
  insertIntoQuestionQuery(
    queries.createNewQuestionQuery,
    quiz_id,
    "Who has won Legend of Rockets twice in a row?",
    "Kill Bill",
    "John Rummy",
    "Scrub Killa",
    "Post Gresql",
    "3"
  );
};

module.exports = {
  connectToServerAndCreateTables: () => {
    client.connect(err => {
      if (err) {
        return console.error("Could not connect to server.", err);
      }

      createTableQuery(
        queries.createUserInformationTableQuery,
        "USER_INFORMATION"
      );
      createTableQuery(queries.createQuizTableQuery, "QUIZ");
      createTableQuery(queries.createQuestionTableQuery, "QUESTION");

      //TODO: Consider using pool for the queries below?
      
      insertIntoQuizQuery(
        queries.createNewQuizQuery,
        ["Rocket League"],
        rocketLeagueQuestionQueries
      );
    });
  }
};
