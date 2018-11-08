const socketIo = require("socket.io");
const uuid = require("uuid/v4");

let io;

//{roomId: xyz, hostId: zyx}
const rooms = new Map();
let currentRoom;

const start = server => {
  io = socketIo(server);
  const games = io.of("/games");

  games.on("connection", socket => {

    if (rooms.size === 0) {
      currentRoom = uuid();
      rooms.set(currentRoom, socket.id);
      games.to(rooms.get(currentRoom)).emit("hostEvent");
      socket.join(currentRoom);
      console.log("CREATED A ROOM WITH HOST")
    } else {
      socket.join(currentRoom);
      console.log("JOINED A ROOM");
      
    }
    // console.log("ID",socket.id);
    // console.log("SOCKET",games.connected);

    socket.on("disconnect", () => {
      if (rooms.get(currentRoom) === socket.id)
        games.in(currentRoom).clients((error, ids) => {
          if (error) throw error;
          // console.log("IDS:", ids);
          ids.forEach(id => {
            games.connected[id].leave(currentRoom)
            console.log(id);
          });
        })
        // console.log(games.connected)
      console.log("user disconnected");
    });
  });

  const lobbyNamespace = io.of("/lobby");

  lobbyNamespace.on("connection", socket => {
    console.log("a user connected to the lobby");

    socket.on("disconnect", () => {
      console.log("user disconnected from the lobby");
    });
  });
};

module.exports = { start };
