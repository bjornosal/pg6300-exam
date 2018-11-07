const socketIo = require("socket.io");

let io;

const start = server => {
  io = socketIo(server);

  io.on("connection", socket => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
module.exports = { start };
