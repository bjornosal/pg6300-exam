const express = require("express");
const router = express.Router();
const passport = require("passport");
const queries = require("./queries");

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
      //TODO: Is this correct?
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

router.get("/api/scores", (req, res) => {
  res.send({ score: 2000 });
});

module.exports = router;
