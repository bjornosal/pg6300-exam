const express = require("express");
const router = express.Router();
const passport = require("passport");
const queries = require("./queries");
const token = require("./sockets/tokenHandler")


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


router.get("/api/updateScore", (req, res) => {
  if(!req.user){
    res.status(401).send();
    return;
}
  //TODO: Update score
});

module.exports = router;
