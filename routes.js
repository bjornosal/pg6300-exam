const express = require("express");
const router = express.Router();
const passport = require("passport");
const queries = require("./queries");

router.post("/api/login", (req, res) => {});

router.post("/api/signup", (req, res) => {
  

    queries
      .createUser(req.body.username, req.body.password)
      .then(result => {
        console.log("signup", result);
        res.status(204).send();
      })
      .catch(err => {
        console.log("ERROR", err);
        res.status(204).send();
      });
      //TODO: continue on this yes
    /*   console.log("created", created)
      if (!created) {
        res.status(400).send();
        return;
      }
     */
    /*
        The incoming HTTP request was not authenticated. However, once we
        create a valid new user, we should manually authenticate the request.
        Otherwise, user would need to make a separate "/api/login" call.
     */
    /*  passport.authenticate("local")(req, res, () => {
       req.session.save(err => {
         if (err) {
           return next(err);
         }
   
         res.status(204).send();
       });
     }); */
});

router.post("/api/logout", (req, res) => {});

router.get("/api/user", (req, res) => {});

router.get("/api/scores", (req, res) => {
  res.send({ score: 2000 });
});

module.exports = router;
