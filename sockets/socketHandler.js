const socketIo = require("socket.io");
const uuid = require("uuid/v4");
const tokenHandler = require("./tokenHandler");
let io;

//{roomId: xyz, hostId: zyx}
const roomToHost = new Map();
const roomToPlayers = new Map();
let players = [];
let currentRoom;

const start = server => {
  io = socketIo(server);
  const games = io.of("/games");

  games.on("connection", socket => {
    socket.on("login", data => {
      const generatedId = generateUniqueId(data);

      if (generatedId.error !== undefined) {
        socket.emit("update", generatedId);
        return;
      }

      const username = data.username;

      if (roomToHost.size === 0) {
        currentRoom = uuid();
        roomToHost.set(currentRoom, socket.id);
        games.to(roomToHost.get(currentRoom)).emit("hostEvent");
        players.push(username);
        socket.join(currentRoom);
        roomToPlayers.set(currentRoom, [username]);

        console.log("CREATED A ROOM WITH HOST - ", username);
      } else {
        joinRoom(socket, username, currentRoom);
      }
    });

    socket.on("disconnect", () => {
      if (roomToHost.get(currentRoom) === socket.id) clearRoom(games, currentRoom);

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

const clearRoom = (namespace, room) => {
  namespace.in(room).clients((error, ids) => {
    if (error) throw error;
    ids.forEach(id => {
      namespace.connected[id].leave(room);
    });

    roomToHost.delete(room);
    roomToPlayers.delete(room);
  });
};

const joinRoom = (socket, username, room) => {
  if (!isUserAlreadyInRoom(username, room)) {
    socket.join(room);
    console.log(username, "JOINED", room);
    roomToPlayers.set(room, roomToPlayers.get(room).concat(username));
  } else {
    socket.emit("update", { error: "You are already in this room." });
  }
};

const isUserAlreadyInRoom = (username, room) => {
  return roomToPlayers.get(room)
    ? roomToPlayers.get(room).includes(username)
    : false;
};

/**
 *  @author: arcuri82
 *  Code from course material in PG6300, by lecturer Andrea Arcuri.
 *  Adapting for my use.
 */
const generateUniqueId = data => {
  if (data === null || data === undefined) {
    return { error: "No payload provided" };
  }
  const token = data.wstoken;

  if (token === null || token === undefined) {
    return { error: "Missing token" };
  }

  const userId = tokenHandler.consumeToken(token);

  console.log("userId", userId);
  if (userId === null || userId === undefined) {
    return { error: "Invalid token" };
  }

  return userId;
};

module.exports = { start };
