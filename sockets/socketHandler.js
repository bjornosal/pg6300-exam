const socketIo = require("socket.io");
const uuid = require("uuid/v4");
const tokenHandler = require("./tokenHandler");
const queries = require("../queries");

let io;

const roomToHost = new Map();
const roomToPlayers = new Map();
const socketToUsername = new Map();
const activeGames = new Map();
const roomTimer = new Map();

let currentRoom = null;
let currentQuiz = null;
/**
 * Shell of this taken from the course code.
 * Most code written by me.
 * @author arcuri82 and bjornosal
 * @param {*} server
 */
const start = server => {
  io = socketIo(server);
  const games = io.of("/games");

  games.on("connection", socket => {
    socket.on("login", async data => {
      const generatedId = generateUniqueId(data);

      if (generatedId.error !== undefined) {
        socket.emit("update", generatedId);
        return;
      }

      const username = data.username;
      socketToUsername.set(socket.id, username);

      if (currentRoom === null) {
        currentRoom = uuid();
        roomToHost.set(currentRoom, { socketId: socket.id, username });
        currentQuiz = await getRandomQuiz();
        games
          .to(roomToHost.get(currentRoom).socketId)
          .emit("hostJoin", { room: currentRoom, username, quiz: currentQuiz });
        socket.join(currentRoom);
        roomToPlayers.set(currentRoom, new Set(username));
      } else {
        joinRoom(
          socket,
          username,
          currentRoom,
          roomToHost.get(currentRoom)
            ? roomToHost.get(currentRoom).username
            : "Unknown"
        );
      }
    });

    socket.on("startGame", () => {
      //TODO: Make this usable for any room, not just the current one.
      if (currentRoom !== null && currentQuiz !== null) {
        activeGames.set(currentRoom, { quiz: currentQuiz, questionNumber: 0 });

        games.to(currentRoom).emit("startingGame", {
          room: currentRoom,
          quiz: activeGames.get(currentRoom)
            ? activeGames.get(currentRoom).quiz
            : { error: "No quiz" },
          questionNumber: 0
        });
        const timerRoom = currentRoom;
        setTimeout(() => {
          roomTimer.set(timerRoom, Date.now());
          console.log("TIMERS:", roomTimer);
        }, 5000);
        currentRoom = null;
        currentQuiz = null;
      }
    });

    socket.on("answerQuestion", data => {
      
      const gameInformation = activeGames.get(data.room);

      if(gameInformation) {
        const correctAnswer = gameInformation.quiz.questions[gameInformation.questionNumber].correct;
        if(correctAnswer === data.answer){
          const answerTime = Date.now();
          const timeElaped = roomTimer.get(data.room) - answerTime;
          const score = 15000 + timeElaped;
          
          
        }
      }
      console.log(socket.id);
      console.log("ANSWER", data);
    });

    socket.on("disconnect", () => {
      if (
        roomToHost.get(currentRoom) !== undefined &&
        roomToHost.get(currentRoom).socketId === socket.id &&
        roomToPlayers.get(currentRoom).size > 1
      ) {
        updateHost(games, currentRoom);
        leaveRoom(socket, currentRoom);
      } else {
        leaveRoom(socket, currentRoom);
      }

      if (roomToPlayers.get(currentRoom).size === 0) {
        currentRoom = null;
        currentQuiz = null;
      }

      console.log("user disconnected");
    });
  });

  const lobby = io.of("/lobby");

  lobby.on("connection", socket => {
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

const joinRoom = (socket, username, room, host) => {
  if (
    !isUserAlreadyInRoom(username, room) &&
    roomToPlayers.get(room) !== undefined
  ) {
    console.log("players in room:", roomToPlayers.get(room));
    socket.join(room);
    roomToPlayers.set(room, roomToPlayers.get(room).add(username));
    //TODO: Does this need a to?
    socket.emit("joinGame", {
      room,
      players: [...roomToPlayers.get(room)],
      host,
      quiz: currentQuiz
    });
    console.log(username, "JOINED", room);
    socket.to(room).emit("playerJoin", { room, username });
  } else {
    socket.emit("update", { error: "You are already in this room." });
  }
};

const isUserAlreadyInRoom = (username, room) => {
  return roomToPlayers.get(room) && roomToPlayers.get(room).size > 1
    ? roomToPlayers.get(room).has(username)
    : false;
};

const leaveRoom = (socket, room) => {
  const username = socketToUsername.get(socket.id);
  roomToPlayers.get(room) !== undefined
    ? roomToPlayers.get(room).delete(username)
    : "";
  roomToPlayers.set(
    room,
    roomToPlayers.get(room) && roomToPlayers.get(room).size > 0
      ? roomToPlayers.get(room)
      : new Set()
  );
  socketToUsername.delete(socket.id);
};

const updateHost = (namespace, room) => {
  const players = roomToPlayers.get(room).values();
  let newHostUsername;
  let potentialHost = players.next().value;
  while (newHostUsername === undefined && potentialHost !== undefined) {
    if (potentialHost !== roomToHost.get(room).username) {
      newHostUsername = potentialHost;
    } else {
      potentialHost = players.next().value;
    }
  }

  if (newHostUsername === undefined) return;

  //Source: https://stackoverflow.com/questions/47135661/how-to-get-a-key-in-a-javascript-map-by-its-value
  const newHostKey = [...socketToUsername.entries()]
    .filter(({ 1: v }) => v === newHostUsername)
    .map(([k]) => k);

  roomToHost.set(room, { socketId: newHostKey[0], username: newHostUsername });
  namespace.to(newHostKey[0]).emit("newHost", { room: room });
  namespace.emit("hostChange", { room: room, username: newHostUsername });
};

const getRandomQuiz = () => {
  return queries.getAmountOfQuizzes().then(amountOfQuizzes => {
    const randomQuizId = Math.floor(Math.random() * amountOfQuizzes + 1);
    return queries.getQuizWithQuestionsById(randomQuizId).then(quiz => {
      return quiz;
    });
  });
};

const enoughPlayersInRoom = room => {
  return roomToPlayers.get(room).size > 1;
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
