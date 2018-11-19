const express = require("express");
const router = express.Router();
const passport = require("passport");
const queries = require("./queries");
const token = require("./sockets/tokenHandler")
const queryTexts = require("./databaseQueries");


/**
 * Auth endpoints taken from course repository. 
 * Adapted to suit my own needs, and added database functionality.
 * @author arcuri82 and bjornosal
 */
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send(req.user);
});

router.post("/api/signup", (req, res) => {
  queries
    .createUser(req.body.username, req.body.password)
    .then(result => {
      if (!result) {
        res.status(400).send();
        return;
      }
      passport.authenticate("local")(req, res, () => {
        req.session.save(err => {
          if (err) return next(err);
          
          res.status(200).send(req.user);
        });
      });
    })
    .catch(err => {
      res.status(500).send();
    });
});

router.post('/api/logout', function(req, res){

  req.logout();
  res.status(204).send();
});

router.get('/api/user', function (req, res) {

  if(! req.user){
      res.status(401).send();
      return;
  }

  res.status(200).json({userId: req.user.user_id, username: req.user.username});
});


/**
 * @author arcuri82
 * Code from course material in PG6300, by lecturer Andrea Arcuri. 
 * Adapted to fit my use.
 */
router.post('/api/wstoken', (req, res) =>  {

  if(!req.user){
      res.status(401).send();
      return;
  }

  const generatedToken = token.createToken(req.user.user_id);
  res.status(201).json({wstoken: generatedToken, username: req.user.username});
});


router.post("/api/updateScore", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }
  //TODO: Update score
});


router.post("/api/quiz", (req, res) => {
  //TODO: Implement again
  /*  if (!req.user) {
    res.status(401).send();
    return;
  } */

  const user = req.user;

  let questionQueries = quiz_id => {
    req.body.questions.forEach(question => {
      queries.createQuestion(
        queryTexts.createNewQuestionQuery,
        quiz_id,
        question.question,
        question.answers,
        question.correctAnswer
      )
    });
  };

 
    
// console.log(req.body.questions);

/* 
  for(let question in ) {
    console.log("question",question)
  } */

  queries
    .createQuiz(
      queryTexts.createNewQuizQuery,
      [req.body.quizName],
      questionQueries
    )
    .then(result => {
      console.log("RESULT", result)
      if (!result) {
        res.status(400).send();
        return;
      }
      res.status(204).send();
    });
});

module.exports = router;
