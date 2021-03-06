const pg = require("pg");
const queryTexts = require("./databaseQueries");
const connection =
  process.env.DATABASE_URL  || "postgres://postgres:5432@localhost/postgres";
const client = new pg.Client({ connectionString: connection, ssl: process.env.DATABASE_URL ? true : false });
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

const createQuiz = async (queryText, quizname, questionQueries) => {
  try {
    const res = await client.query(queryText, quizname);
    questionQueries(res.rows[0].quiz_id);
    return res.rows[0].quiz_id;
  } catch (err) {
    console.log("Issues inserting: ", err);
  }
};

const createQuestion = (queryText, quizId, question, answers, correct) => {
  client
    .query(queryText, [quizId, question, answers, correct])
    .then(res => {
    })
    .catch(err => {
      console.log("INSERT INTO ERROR:", err);
    });
};

const defaultDataInit = rocketLeagueQuestionQueries => {
  client.connect(err => {
    if (err) {
      return console.error("Could not connect to server. \nIs server running? \nRun command 'npm run dockerPg' to start it.");
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

    createTable(queryTexts.createUserInformationTableQuery, "USER_INFORMATION");
    createTable(queryTexts.createQuizTableQuery, "QUIZ");
    createTable(queryTexts.createQuestionTableQuery, "QUESTION");

    createQuiz(
      queryTexts.createNewQuizQuery,
      ["Rocket League"],
      rocketLeagueQuestionQueries
    );
    createUser("1", "1");
    createUser("2", "2");
  });
};

const getUser = username => {
  return client
    .query(queryTexts.findUserWithUsername, [username])
    .then(res => {
      return res.rows.length > 0 ? res.rows[0] : undefined;
    })
    .catch(err => {
      return undefined;
    });
};

const verifyUser = (username, password) => {
  return getUser(username)
    .then(res => {
      return bcrypt
        .compare(password, res.password)
        .then(res => {
          return res;
        })
        .catch(err => {
          return false;
        });
    })
    .catch(err => {
      return false;
    });
};

const createUser = async (username, password) => {
  return await bcrypt
    .hash(password, 12)
    .then(async hashedPassword => {
      try {
        await client.query(queryTexts.createNewUserWithUsernameQuery, [
          username,
          hashedPassword,
          0
        ]);
        return true;
      } catch (err) {
        return false;
      }
    })
    .catch(err => {
      return false;
    });
};

const getAmountOfQuizzes = async () => {
  return client
    .query(queryTexts.getAmountOfQuizzes)
    .then(res => {
      return res.rows[0].count;
    })
    .catch(err => {
      return 0;
    });
};

const getQuizById = async id => {
  return client
    .query(queryTexts.getQuizById, [id])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return -1;
    });
};

const getAllQuestionsByQuizId = async id => {
  return client.query(queryTexts.getAllQuestionsByQuizId, [id]).then(res => {
    return res.rows;
  });
};

const getQuizWithQuestionsById = async id => {
  const quiz = await getQuizById(id);
  const quizQuestions = await getAllQuestionsByQuizId(id);
  quiz["questions"] = quizQuestions;
  return quiz;
};

const updateScoreOfUser = async (score, user_id) => {
  return await client.query(queryTexts.updateScoreOfUser, [score, user_id]);
};

const getAllUsernamesWithScores = async () => {
  return await client.query(queryTexts.getAllUserNamesWithScores);
};

module.exports = {
  createTable,
  createQuiz,
  createQuestion,
  getUser,
  verifyUser,
  createUser,
  defaultDataInit,
  getAmountOfQuizzes,
  getQuizWithQuestionsById,
  updateScoreOfUser,
  getAllUsernamesWithScores
};
