const pg = require("pg");
const queryTexts = require("./databaseQueries");
const connection =
  process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";
const client = new pg.Client(connection);
const bcrypt = require("bcrypt");

const createTable = (queryText, tableName) => {
  client.query(queryText).then(
    res => {
      console.log("TABLE '" + tableName + "' IS SET UP.");
    },
    err => {
      console.error("Issues setting up: ", err);
    }
  );
};

const createQuiz = (queryText, quizname, questionQueries) => {
  client
    .query(queryText, quizname)
    .then(res => {
      questionQueries(res.rows[0].quiz_id);
    })
    .catch(err => {
      console.log("Issues inserting: ", err);
    });
};

const createQuestion = (
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

const defaultDataInit = rocketLeagueQuestionQueries => {
  client.connect(err => {
    if (err) {
      return console.error("Could not connect to server.", err);
    }
    client.query("DROP TABLE IF EXISTS QUESTION").catch(err => {
      console.log("DROPPING TABLE USER_INFORMATION FAILED", err);
    });
    client.query("DROP TABLE IF EXISTS QUIZ").catch(err => {
      console.log("DROPPING TABLE USER_INFORMATION FAILED", err);
    });
    client.query("DROP TABLE IF EXISTS USER_INFORMATION").catch(err => {
      console.log("DROPPING TABLE USER_INFORMATION FAILED", err);
    });

    console.log("CREATING DATABASE THINGS");
    createTable(queryTexts.createUserInformationTableQuery, "USER_INFORMATION");
    createTable(queryTexts.createQuizTableQuery, "QUIZ");
    createTable(queryTexts.createQuestionTableQuery, "QUESTION");

    //TODO: Consider using pool for the queries below?

    createQuiz(
      queryTexts.createNewQuizQuery,
      ["Rocket League"],
      rocketLeagueQuestionQueries
    );
  });
};

const getUser = (username) => {
  client
    .query(findUserWithUsername, [username])
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

const verifyUser = (username, password) => {
  const user = getUser(id);

  if (user === undefined) {
    return false;
  }

  return user.password === password;
}

const createUser = async (username, password) => {
  await bcrypt
    .hash(password, 12)
    .then(async hashedPassword => {
      try {
        const res = await client.query(
          queryTexts.createNewUserWithUsernameQuery,
          [username, hashedPassword]
        );
        console.log("CREATE USER: ", res);
        return true;
      } catch (err) {
        console.log("ERROR USER: ", err);
        return false;
      }
    })
    .catch(err => {
      return false;
    });
}

module.exports = {
  createTable,
  createQuiz,
  createQuestion,
  getUser,
  verifyUser,
  createUser,
  defaultDataInit
};
