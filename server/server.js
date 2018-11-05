require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const pg = require("pg");
const passport = require("passport");
const defaultDataInitializer = require("./defaultDataInitializer")

const port = process.env.PORT || 8080;

defaultDataInitializer.connectToServerAndCreateTables();

//TODO: Implement this again?
// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "client/build")));
// }

app.get("/api/scores", (req, res) => {
  res.send({ score: 2000 });
});

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}


app.listen(port, () => console.log(`Listening on port ${port}`));
