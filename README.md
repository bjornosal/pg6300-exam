# PG6300 Exam - Web Development and API Design :computer: 

This is the main readme for the exam delivery in the course PG6300.

# Quhoot

The application can be seen on Heroku, at [Quhoot](https://pg6300-bjornosal.herokuapp.com).


## Instructions

##### Run Local

__To run in development, complete the following steps:__
- Navigate to the root folder of the project (the location of this file)
- Run command `npm run dockerPg`
- If grading this exam, run `npm run _grading`
  - This will run npm install in both server and client, and start the server afterwards. 
  - After the command has finished, navigate to the client and run the command `npm start`
- Run command `npm install` in the root folder
- Run the command `npm run dev` in the root folder
- Navigate to the client in a different terminal and run command `npm install`
- Run the command `npm start`
- Your browser should open up on http://localhost:8080


__To run as a single instance production build, continue with the following steps:__
- Navigate to the root folder of the project (the location of this file)
- Run command `npm run dockerPg` if not previously ran
- Run command `npm run _prod`
- Open your browser on http://localhost:3000


## Application Topic
The application topic for this exam is about an online, multi-player quiz game. A registered user (let’s call him/her X) can start a new match and wait. Every time a new user wants to start a game, s/he will join the game of X. Once X sees that there are enough other players (at least 1) that want to play, s/he will actually start the match. No other player can join that specific match once started (they will start their own new match).
In a match, there are going to be N quizzes (e.g., N=10) on some topic (each time at random). Each quiz will have up to M answers (e.g., M=4), where only 1 is correct. Players get points based on the correct answers and how long they take to answer (the quicker, the more points). At the end of the N quizzes, players should be ranked, and the one with most points will be declared as the winner.
Add any extra feature relevant to such type of system. This is going to be very important for B/A grades.

## Solution
In my solution authenticated players are able to join a quiz, and play versus other players. A quiz will be chosen at random. There will be one host, who has control over the game, and is in control of starting the match, as well as changing to the next question. If the host leaves while the game is playing, the next player in line will be given the host rights, so that players can keep playing, even if one does not want to continue. 

The players will play through the game, answering questions based on a timer, and will be granted a score that is calculated using secret maths. When the game is finished, the users will be presented with a scoreboard, and an overall winner. 

Quizzes can be created by the developer, with infinite amount of questions, or by the users, through the tool Quiz Maker. Here they are able to create a quiz with 10 questions and 10 answers to each of those questions. When they have created their quiz, it will be added to the pool of quizzes. The solution starts with one quiz added already, about a game called Rocket League.

If the users want, they are able to look up the global leaderboards, which keeps track of the 25 players in the world with the highest score.

## Structure

To function as a single-instance node application, the folder structure is set up so that the client is within the server. This makes it easy to host on a cloud-provider, as well as building hosting the application locally. 

#### Server 
Most files are on root, except sockets, which are in the sockets folder. 
Server is hosted from server.js. 

For my database I am using PostgreSQL with the framework node-postgres. It sets up a connection and creates all the required tables on each restart. In that manner it also drops the existing tables, to have a clean start on each run in development. My queries are parameterized to avoid SQL injection. 

All routing is handled in routes.js, including signup, login, logout, issuing tokens, updating score and creating new quizzes. 

Authentication and authorization is handled through the framework passportjs. 

Sockets are set up using socket.io, as presented in the course. 
For the sockets, I am using namespaces and rooms to more effectively handle sockets in the different rooms. That way it is easy to run multiple rooms and quizzes, and send messages to the users based on which room they are in. 

#### Client 



## Implementation

## Technologies

## Extra
