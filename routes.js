const express = require('express')
const router = express.Router();
const passport = require('passport');

router.post("/api/login", (req, res) => {});

router.post("/api/signup", (req, res) => {});

router.post("/api/logout", (req, res) => {});

router.get("/api/user", (req, res) => {});

router.get("/api/scores", (req, res) => {
  res.send({ score: 2000 });
});


module.exports = router;