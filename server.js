require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/api/scores", (req, res) => {
  res.send({ score: 2000 });
});



if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

/**
 * Use docker instead?
 */
app.listen(port, () => console.log(`Listening on port ${port}`));
