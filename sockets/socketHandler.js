const socketIo = require("socket.io");
const uuid = require("uuid/v4");
const tokenHandler = require("./tokenHandler")
let io;

//{roomId: xyz, hostId: zyx}
const roomToHost = new Map();
let players = [];
let currentRoom;

const start = server => {
  io = socketIo(server);
  const games = io.of("/games");

  games.on("connection", socket => {


    socket.on('login', (data) => {
      console.log("LOGINDATA:", data)
      const generatedId = generateUniqueId(data);

      if (generatedId.error !== undefined) {
        socket.emit("update", generatedId);
        return
      }

      const username = data.username;
      console.log("size", roomToHost.size)
      if (roomToHost.size === 0) {
        currentRoom = uuid();
        roomToHost.set(currentRoom, socket.id);
        games.to(roomToHost.get(currentRoom)).emit("hostEvent");
        players.push(username);
        socket.join(currentRoom);
        console.log("players", players);
        console.log("CREATED A ROOM WITH HOST");
      } else {
        if (!players.includes(username)) {
          socket.join(currentRoom);
          console.log("JOINED A ROOM");

        } else {
          socket.emit("update", { error: "You are already in this room." })
        }
      }
    });

    // console.log("ID",socket.id);
    // console.log("SOCKET",games.connected);

    socket.on("disconnect", () => {
      if (roomToHost.get(currentRoom) === socket.id)
        games.in(currentRoom).clients((error, ids) => {
          if (error) throw error;
          // console.log("IDS:", ids);
          ids.forEach(id => {
            games.connected[id].leave(currentRoom)
            console.log(id);
          });
          roomToHost.delete(currentRoom)
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

const isUserAlreadyInRoom = (userId, room) => {

}

/**
 *  @author: arcuri82
 *  Code from course material in PG6300, by lecturer Andrea Arcuri.
 *  Adapting for my use.
 */
const generateUniqueId = (data) => {
  if (data === null || data === undefined) {
    return { error: "No payload provided" };
  }
  const token = data.wstoken;

  if (token === null || token === undefined) {
    return { error: "Missing token" };
  }

  const userId = tokenHandler.consumeToken(token);

  console.log("userId", userId)
  if (userId === null || userId === undefined) {
    return { error: "Invalid token" };
  }

  return userId;
}

module.exports = { start };
