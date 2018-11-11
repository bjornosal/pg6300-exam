const socketIo = require("socket.io");
const uuid = require("uuid/v4");
const tokenHandler = require("./tokenHandler");
const queries = require("../queries");

let io;

const roomToHost = new Map();
const roomToPlayers = new Map();
const socketToUsername = new Map();
const socketToScore = new Map();
const socketToAnswer = new Map();
const activeGames = new Map();
const roomTimer = new Map();

let currentRoom = null;
let currentQuiz = null;
/**
 * Shell of this taken from the course code.
 * Most code written by me.
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
      socket["username"] = username;
      if (currentRoom === null) {
        currentRoom = uuid();
        roomToHost.set(currentRoom, { socketId: socket.id, username });
        currentQuiz = await getRandomQuiz();
        games
          .to(roomToHost.get(currentRoom).socketId)
          .emit("hostJoin", { room: currentRoom, username, quiz: currentQuiz });
        socket.join(currentRoom);
        socket["currentRoom"] = currentRoom;
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
        }, 5000);
        currentRoom = null;
        currentQuiz = null;
      }
    });

    socket.on("answerQuestion", async data => {
      const gameInformation = activeGames.get(data.room);

      if (gameInformation) {
        const correctAnswer =
          gameInformation.quiz.questions[gameInformation.questionNumber]
            .correct;

        socket["answered"] = true;
        if (correctAnswer === data.answer) {
          const answerTime = Date.now();
          const timeElaped = roomTimer.get(data.room) - answerTime;
          const score = 15000 + timeElaped;
          socketToScore.get(socket.id)
            ? socketToScore.set(socket.id, socketToScore.get(socket.id) + score)
            : socketToScore.set(socket.id, score);
        }

        if (await everyoneHasAnswered(games, data.room)) {
          games.to(data.room).emit("questionDone");
        }
      }
    });

    socket.on("nextQuestion", data => {
      const gameInformation = activeGames.get(data.room);
      if (gameInformation) {
        games.to(data.room).emit("newQuestion", {
          room: data.room,
          quiz: gameInformation.quiz,
          questionNumber: gameInformation.questionNumber + 1
        });
        activeGames.set(data.room, {
          quiz: gameInformation.quiz,
          questionNumber: gameInformation.questionNumber + 1
        });
        setAllSocketsInRoomToNotAnswered(games, data.room);
      }
    });

    socket.on("disconnect", () => {
      const room = socket.currentRoom;
      if (room !== undefined) {
        if (
          roomToHost.get(room) !== undefined &&
          roomToHost.get(room).socketId === socket.id &&
          roomToPlayers.get(room).size > 1
        ) {
          updateHost(games, room);
          leaveRoom(socket, room);
        } else {
          leaveRoom(socket, room);
        }

        if (roomToPlayers.get(room).size === 0) {
          if (room === currentRoom) {
            currentRoom = null;
            currentQuiz = null;
          }
        }
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

const setAllSocketsInRoomToNotAnswered = (namespace, room) => {
  namespace.in(room).clients((error, ids) => {
    if (error) throw error;
    ids.forEach(id => {
      namespace.connected[id]["answered"] = false;
    });
  });
};

const everyoneHasAnswered = async (namespace, room) => {
  let allAnswered = true;
  await namespace.in(room).clients((error, ids) => {
    if (error) throw error;

    ids.forEach(id => {
      if (
        namespace.connected[id].answered === false ||
        namespace.connected[id].answered === undefined
      )
        allAnswered = false;
    });
  });
  return allAnswered;
};

const joinRoom = (socket, username, room, host) => {
  if (
    !isUserAlreadyInRoom(username, room) &&
    roomToPlayers.get(room) !== undefined
  ) {
    socket.join(room);
    socket["currentRoom"] = room;
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
  const username = socket.username

  roomToPlayers.get(room) !== undefined
    ? roomToPlayers.get(room).delete(username)
    : "";
  roomToPlayers.set(
    room,
    roomToPlayers.get(room) && roomToPlayers.get(room).size > 0
      ? roomToPlayers.get(room)
      : new Set()
  );
};

const updateHost = async (namespace, room) => {
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

  let newHostKey;
  await namespace.in(room).clients((error, ids) => {
    if (error) throw error;
    ids.forEach(id => {
      if (namespace.connected[id].username === newHostUsername)
        newHostKey = id;
    });
  })

  roomToHost.set(room, { socketId: newHostKey, username: newHostUsername });
  namespace.to(newHostKey).emit("newHost", { room: room });
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

  if (userId === null || userId === undefined) {
    return { error: "Invalid token" };
  }

  return userId;
};

module.exports = { start };
