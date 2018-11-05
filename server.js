require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const pg = require("pg");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const defaultDataInitializer = require("./defaultDataInitializer")
const session = require("express-session");
const routes = require('./routes');
const queries = require("./queries")
const port = process.env.PORT || 8080;

// if (process.env.NODE_ENV !== "production") {
defaultDataInitializer.connectToServerAndCreateTables();
// }

//TODO: Implement this again?
// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "client/build")));
// }
app.use(bodyParser.json());

  //FIXME: WHY
  app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
  }));

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {

    const ok = queries.verifyUser(username, password);

    if (!ok) {
      return done(null, false, { message: 'Invalid username/password' });
    }

    const user = queries.getUser(username);
    return done(null, user);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {

  const user = Repository.getUser(id);

  if (user !== undefined) {
    done(null, user);
  } else {
    done(null, false);
  }
});


app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);


if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}


app.listen(port, () => console.log(`Listening on port ${port}`));
