const pg = require("pg");
const queries = require("./databaseQueries");

const connection =
  process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";

const client = new pg.Client(connection);

const clientQuery = (queryText, tableName) => {
  client.query(queryText).then(
    res => {
      console.log("TABLE '"+ tableName + "' HAS BEEN SET UP.");
    },
    err => {
      console.error("Issues setting up: ", err);
    }
  );
};



module.exports = {
  connectToServerAndCreateTables: () => {
    client.connect(err => {
      if (err) {
        return console.error("Could not connect to server.", err);
      }

      clientQuery(queries.createUserInformationTableQuery, "USER_INFORMATION");
      clientQuery(queries.createQuizTableQuery, "QUIZ");
      clientQuery(queries.createQuestionTableQuery, "QUESTION");
    });
  }
};
