require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const defaultDataInitializer = require("./defaultDataInitializer");
const session = require("express-session");
const routes = require("./routes");
const queries = require("./queries");
const port = process.env.PORT || 8080;
const socketHandler = require("./sockets/socketHandler")
const http = require('http').Server(app);

socketHandler.start(http);

defaultDataInitializer.connectToServerAndCreateTables();

//TODO: Implement this again?
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
app.use(bodyParser.json());

//FIXME: WHY
app.use(
  session({
    secret: "a secret used to encrypt the session cookies",
    resave: false,
    saveUninitialized: false
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      const verified = await queries.verifyUser(username, password);
      if (!verified) {
        return done(null, false, { message: "Invalid username/password" });
      }

      const user = await queries.getUser(username);
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  queries
    .getUser(username)
    .then(res => {
      if (res !== undefined) {
        done(null, res);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      done(null, false);
    });
});

app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

http.listen(port, () => console.log(`Listening on port ${port}`));
