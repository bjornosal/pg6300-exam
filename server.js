const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Listening on port ${port}`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get('/server', (req, res) => {
  res.send({ server: 'Hi React, can you see me? Kind regards, Server' });
});