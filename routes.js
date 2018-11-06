const express = require("express");
const router = express.Router();
const passport = require("passport");
const queries = require("./queries");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(204).send();
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
          if (err) {
            return next(err);
          }

          res.status(204).send();
        });
      });
    })
    .catch(err => {
      //TODO: Is this correct?
      res.status(500).send();
    });
});

router.post("/api/logout", (req, res) => {});

router.get("/api/user", (req, res) => {});

router.get("/api/scores", (req, res) => {
  res.send({ score: 2000 });
});

module.exports = router;
