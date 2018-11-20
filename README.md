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

The sockethandler is built to handle a lobby, where the user can choose which games he wants to join. It is lacking some minor tweaks, testing, and a decent page to be able to work, therefore the default lobby page and the routes has been removed.

#### Client 

The client mostly consists of containers, and a few components. There are more elements of the application that could have been extracted into components, which would have made the solution more streamlined. 

__State__

For state handling throughout my application I make use of Redux with Redux Thunk to make asyncronous calls. Almost all state, except the one of the quiz maker and the leaderboard is handled through Redux. The state on the mentioned pages are handled in the component state instead. 

Using Redux makes sharing information throughout the application easy. But it would most likely be faster to use only component state for an application of this size, but has been implemented  as an extra addition the the exam. 

__Navigation__ 
Navigation throughout the application is handled using React Router. 

__Forms__
For my forms, such as login, and signup, I am using Redux Forms, which works quite well with Redux.

## Implementation 

I focused most of my development on the sockets and having a smooth handling of the sockets in the quiz part of the application, and as previously stated, implemented it using namespaces and rooms which is a part of socket.io. 

This way there is not a ton of redundant REST calls through the application, as the websockets are able to handle most of the logic, including starting matches, keeping track of hosts, points and more.

Authentication is handled with passportjs and bcrypt. Using bcrypt before persisting to the database so that the password won't be saved as plain text.

## Technologies

I've used the following technologies: 

__Standard:__
- React
- Node.js
- Express.js

__Other:__

Server: 
- Express session for session based authentication
- PassportJs 
- Bcrypt
- Socket.io
- pg - PostgreSQL in NodeJS
- uuid for making room names
- Nodemon for simple reload on development.

Client: 
- Prop-types
- Redux
- React Router
- React-Select (Used on Quiz Maker page)
- Redux Form
- Redux Thunk
- Socket.io client version

## Extra

The following has been done in addition the the requirements presented by the assignment.

#### Deployment
The application has been deployed to Heroku, and can be seen here: [Quhoot](https://pg6300-bjornosal.herokuapp.com).


#### Host Change 
As mentioned earlier in the README, I've implemented the ability to change hosts if the original host leaves. This required quite some logic and thinkering on both server and client side, which is why I consider it an extra. It also gives the user a better experience using the application. 

#### Quiz Maker
Being able to make your own quizzes was one of my main planned features, which would be even more visible with a lobby game mode. Fortunately it brings a lot of extra functionality to the existing game as well, bringing the user the ability to get a bigger arsenal of quizzes that will be chosen randomly from. 

What it lacks in styling, it brings back with functionality.

#### Leaderboard
Implementing the leaderboard requires more REST calls to the server, and queries to the database, even if the styling isn't all there.

#### Authentication
The users are able to sign up to the service, and log back in at a later time if they want to. 
Their score will be saved on their user, and will be shown on the leaderboard if they are within the top 25 globally.

#### Redux

Implemented Redux for state handling, with Redux Thunk as an addition which gives the possibility to do async actions. Even if, as I previously mentioned, it was a bit too complex  for this size an application, using redux thunk for dispatching, and in the end emitting, was a very good addition to the structure of the application. 

#### Styling
Styling was done as an extra, with most parts of the application having a decent design, which makes the experience better as a whole. 


#### Lobby (Not completed)
Most of the socket implementation was built with a Lobby gamemode in mind. Almost all of the functionality is there, but the implementation of it will have to wait until a later time. 
