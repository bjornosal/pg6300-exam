(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{110:function(e,t,n){e.exports=n.p+"static/media/questionMark.380033f7.png"},111:function(e,t,n){e.exports=n.p+"static/media/listIcon.50e9ff92.svg"},147:function(e,t,n){e.exports=n(197)},155:function(e,t,n){},183:function(e,t){},197:function(e,t,n){"use strict";n.r(t);var a,r=n(0),o=n.n(r),s=n(40),i=n.n(s),u=n(7),c=n(201),l=n(8),m=n(12),p=n(13),d=n(16),h=n(14),g=n(17),f=(n(155),n(199)),E=n(110),b=n.n(E),O=n(111),v=n.n(O),w=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"homeContainer"},o.a.createElement("div",{className:"gameModeContainer"},o.a.createElement("div",{className:"gamemodeChooser gameModeAuto"},o.a.createElement("div",{className:"gameModeImageContainer"},o.a.createElement("img",{className:"gameModeImage",src:b.a,alt:""})),o.a.createElement("p",{className:"gameModeInfo"},"Automatically join a game. "),o.a.createElement(f.a,{to:void 0!==this.props.loggedIn&&this.props.loggedIn?"/game":"/login",className:"gamemodeButton"},"Auto")),o.a.createElement("div",{className:"gamemodeChooser gameModeLobby"},o.a.createElement("div",{className:"gameModeImageContainer"},o.a.createElement("img",{className:"gameModeImage",src:v.a,alt:""})),o.a.createElement("p",{className:"gameModeInfo"},"Go check out the scores!",o.a.createElement("br",null)," Have your friends played?"),o.a.createElement(f.a,{to:"/leaderboard",className:"gamemodeButton"},"Leaderboard")),o.a.createElement("div",{className:"quizMakerPageContainer"},o.a.createElement("p",{className:"quizMakerInfo"},"Create your own quiz!"),o.a.createElement(f.a,{to:"/quizMaker",className:"quizMakerButton"},"Quiz Maker"))))}}]),t}(r.Component),y=Object(l.b)(function(e){return{loggedIn:e.login.loggedIn}})(w),S=n(112),N=n.n(S),j=n(11),C=n.n(j),q=n(25),T=function(e){return{type:"START_GAME",payload:e}},k=function(e,t,n,a){return{type:"NEXT_QUESTION",room:e,quizId:t,question:n,answers:a}},I=function(e,t,n,a){return{type:"LAST_QUESTION",room:e,quizId:t,question:n,answers:a,lastQuestion:!0}},_=function(){var e=Object(q.a)(C.a.mark(function e(t){var n,a;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"/api/wstoken",e.prev=1,e.next=4,fetch("/api/wstoken",{method:"post"});case 4:n=e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return","Failed to connect to server: "+e.t0);case 10:if(401!==n.status){e.next=12;break}return e.abrupt("return","You need to login first.");case 12:if(201===n.status){e.next=14;break}return e.abrupt("return","Error when connecting to server: status code "+n.status);case 14:return e.next=16,n.json();case 16:return a=e.sent,t.emit("login",a),e.abrupt("return",n);case 19:case"end":return e.stop()}},e,this,[[1,7]])}));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(q.a)(C.a.mark(function e(t){var n;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"/api/updateScore",e.prev=1,e.next=4,fetch("/api/updateScore",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({score:t})});case 4:n=e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return","Failed to connect to server: "+e.t0);case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}},e,this,[[1,7]])}));return function(t){return e.apply(this,arguments)}}(),U=n(202),G=function(e){function t(e){var n;Object(m.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this,e))).componentWillMount=function(){n.props.history.push("/game"),n.socket=N()("/games"),n.authenticateSocket(n.socket),n.onHostEvent(),n.onJoinGame(),n.onPlayerJoin(),n.onPlayerLeave(),n.onHostChange(),n.onAlreadyInRoom(),n.onNewHost(),n.onGameStart(),n.onNewQuestion(),n.onQuestionDone(),n.onGameFinish()},n.componentWillUnmount=function(){n.socket.close(),n.stopAllCountdownTimers()},n.onHostEvent=function(){n.socket.on("hostJoin",function(e){a=e.room,n.props.hostGame(e.room,e.username,!0,e.quiz.name,e.quiz.questions.length)})},n.onJoinGame=function(){n.socket.on("joinGame",function(e){a=e.room,n.props.joinGame(e.room,e.players,e.host,e.quiz.name,e.quiz.questions.length)})},n.onPlayerJoin=function(){n.socket.on("playerJoin",function(e){n.props.playerJoin(e.room,e.username)})},n.onPlayerLeave=function(){n.socket.on("playerLeave",function(e){n.props.playerLeave(e.room,e.username)})},n.onNewHost=function(){n.socket.on("newHost",function(e){n.props.newHost(e.room)})},n.onHostChange=function(){n.socket.on("hostChange",function(e){n.props.hostChange(e.room,e.username)})},n.onAlreadyInRoom=function(){n.socket.on("alreadyInRoom",function(){n.props.history.push("/")})},n.onGameFinish=function(){n.socket.on("gameFinish",function(e){n.props.finishGame(e.room,e.players,e.scores,n.socket.id)})},n.authenticateSocket=function(e){n.props.authenticateUserSocket(e,n.props.history)},n.startGame=function(){n.socket.emit("startGame",a)},n.onGameStart=function(){n.socket.on("startingGame",function(e){n.props.history.push("/game/"+e.room),n.props.startingGame(e.room,e.quiz,e.questionNumber),n.startCountdownTimer(),n.introQuestionTimer=setTimeout(function(){n.startQuestionCountdownTimer(10),n.finishQuestionTimer=setTimeout(function(){n.setState({questionDone:!0})},1e4)},3e3)})},n.onNewQuestion=function(){n.socket.on("newQuestion",function(e){n.stopAllCountdownTimers(),n.stopFinishQuestionTimer(),n.props.getNewQuestion(e.room,e.quiz,e.questionNumber),n.setState({countdownTimer:3,questionCountdownTimer:10,answered:!1,questionDone:!1}),n.startCountdownTimer(),n.introQuestionTimer=setTimeout(function(){n.startQuestionCountdownTimer(10),n.finishQuestionTimer=setTimeout(function(){n.setState({questionDone:!0})},1e4)},3e3)})},n.onQuestionDone=function(){n.socket.on("questionDone",function(){n.setState({questionDone:!0})})},n.informWaitingForMorePlayers=function(){alert("Waiting for more players")},n.answerQuestion=function(e){n.socket.emit("answerQuestion",{room:a,answer:e}),n.setState({answered:!0})},n.nextQuestion=function(){n.socket.emit("nextQuestion",{room:a})},n.stopAllCountdownTimers=function(){null!==n.countdown&&clearInterval(n.countdown),null!==n.questionCountdown&&clearInterval(n.questionCountdown)},n.stopFinishQuestionTimer=function(){null!==n.finishQuestionTimer&&clearTimeout(n.finishQuestionTimer),null!==n.introQuestionTimer&&clearTimeout(n.introQuestionTimer)},n.startCountdownTimer=function(){n.countdown=setInterval(function(){n.setState(function(e){return{countdownTimer:e.countdownTimer-1}}),0===n.state.countdownTimer&&clearInterval(n.countdown)},1e3)},n.startQuestionCountdownTimer=function(e){n.setState({questionCountdownTimer:e}),n.questionCountdown=setInterval(function(){n.setState(function(e){return{questionCountdownTimer:e.questionCountdownTimer-1}}),0===n.state.questionCountdownTimer&&(clearInterval(n.questionCountdown),n.answerQuestion(-1))},1e3)};return n.state={countdownTimer:3,questionCountdownTimer:10,answered:!1},n.socket=void 0,a=null,n}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"gameContainer"},!this.props.isStarting&&!this.props.isStarted&&o.a.createElement("div",{className:"gameInformationContainer"},o.a.createElement("div",{className:"quizInformation"},o.a.createElement("h2",{className:"quizName"},this.props.quizName||"Quiz X"),o.a.createElement("p",{className:"quizQuestions"},this.props.amountOfQuestions?this.props.amountOfQuestions+" questions":"I don't know how many questions there are."),o.a.createElement("p",{className:"quizHost"},"Hosted by:"," ",(this.props.isHost?"YOU":"")||(this.props.host?this.props.host:"Unknown"))),o.a.createElement("div",{className:"playersContainer"},this.props.players&&this.props.players instanceof Array?this.props.players.map(function(e,t){return o.a.createElement("div",{key:t,className:"player"},e)}):o.a.createElement("div",{className:"player"},this.props.players?this.props.players:"No players yet.")),o.a.createElement("div",{className:"buttonContainer"},this.props.isHost&&o.a.createElement("button",{className:"quizButton startButton",onClick:this.props.players instanceof Array&&this.props.players.length>1?this.startGame:this.informWaitingForMorePlayers},"Start Game"),o.a.createElement(f.a,{to:"/",className:this.props.isHost?"quizButton leaveButton":"quizButton"},"Leave Game"))),this.props.isStarting&&!this.props.isStarted&&o.a.createElement("div",{className:"gameInformationContainer countdownContainer"},o.a.createElement("div",{className:"countdownTimer"},this.state.countdownTimer)),!this.props.isStarting&&this.props.isStarted&&o.a.createElement("div",{className:"gameInformationContainer activeGameContainer"},o.a.createElement("div",{className:"questionMainContainer"},!this.state.questionDone&&o.a.createElement("div",{className:"questionContainer"},o.a.createElement("div",{className:"question"},this.props.question),o.a.createElement("p",{className:"questionCountdown"},this.state.questionCountdownTimer)),o.a.createElement("div",{className:"answersContainer"},!this.state.questionDone&&!this.state.answered&&this.props.answers.map(function(t,n){return o.a.createElement("button",{key:n,className:"answer",onClick:function(){e.answerQuestion(n)}},t)})||!this.state.questionDone&&!this.props.lastQuestion&&o.a.createElement("div",{className:"answerWaiting"},"Waiting for the other players",o.a.createElement("span",null,"."),o.a.createElement("span",null,"."),o.a.createElement("span",null,"."))||!this.props.isHost&&!this.props.lastQuestion&&o.a.createElement("div",{className:"answerWaiting"},"Waiting for the next question",o.a.createElement("span",null,"."),o.a.createElement("span",null,"."),o.a.createElement("span",null,".")),this.props.isHost&&!this.props.lastQuestion&&this.state.questionDone&&o.a.createElement("button",{onClick:this.nextQuestion,className:"nextQuestionButton"},"Next Question"),this.state.questionDone&&this.props.lastQuestion&&void 0!==this.props.scores&&o.a.createElement("div",{className:"resultContainer"},o.a.createElement("h2",null,"Scores"),o.a.createElement("div",{className:"winnerContainer"},"Winner winner ",this.props.scores?this.props.scores[0][0]+" with "+this.props.scores[0][1]:"Unknown winner"),o.a.createElement("table",null,o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Rank"),o.a.createElement("th",null,"Username"),o.a.createElement("th",null,"Score"))),o.a.createElement("tbody",null,this.props.scores.map(function(e,t){return o.a.createElement("tr",{key:t},o.a.createElement("td",null,t+1),o.a.createElement("td",null,e[0]),o.a.createElement("td",null,e[1]?e[1]:0))})))),this.state.questionDone&&this.props.lastQuestion&&o.a.createElement(f.a,{to:"/",className:"returnHomeButton"},"Return to main menu")))))}}]),t}(r.Component),Q=Object(l.b)(function(e){return{players:e.game[a]?e.game[a].players:void 0,isHost:!!e.game[a]&&e.game[a].isHost,quizName:e.game[a]?e.game[a].quizName:"Unknown",amountOfQuestions:e.game[a]?e.game[a].amountOfQuestions:0,host:e.game[a]?e.game[a].host:void 0,isStarting:!!e.game[a]&&e.game[a].isStarting,isStarted:!!e.game[a]&&e.game[a].isStarted,question:e.game[a]?e.game[a].question:"Missing Question",answers:e.game[a]?e.game[a].answers:["I don't know."],lastQuestion:!!e.game[a]&&e.game[a].lastQuestion,scores:e.game[a]?e.game[a].scores:[]}},{authenticateUserSocket:function(e,t){return function(n){_(e).then(function(e){201===e.status?(n({type:"AUTH_USER_SOCKET"}),n(T)):(t.push("/login"),n({type:"LOGIN_ERROR"}))})}},joinGame:function(e,t,n,a,r){return{type:"JOIN_GAME",room:e,players:t,host:n,quizName:a,amountOfQuestions:r}},playerJoin:function(e,t){return{type:"PLAYER_JOIN",room:e,username:t}},playerLeave:function(e,t){return{type:"PLAYER_LEAVE",room:e,username:t}},hostGame:function(e,t,n,a,r){return{type:"HOST_GAME",room:e,username:t,isHost:n,quizName:a,amountOfQuestions:r}},hostChange:function(e,t){return{type:"HOST_CHANGE",room:e,username:t}},newHost:function(e){return{type:"NEW_HOST",room:e}},startingGame:function(e,t,n){return function(a){t.questions.length-1===n?a(I(e,t.quiz_id,t.questions[n].question,t.questions[n].answers)):a(k(e,t.quiz_id,t.questions[n].question,t.questions[n].answers)),setTimeout(function(){a({type:"GAME_STARTED",room:e})},3e3)}},getNewQuestion:function(e,t,n){return function(a){t.questions.length-1===n?a(I(e,t.quiz_id,t.questions[n].question,t.questions[n].answers)):a(k(e,t.quiz_id,t.questions[n].question,t.questions[n].answers)),setTimeout(function(){a({type:"GAME_STARTED",room:e})},3e3)}},finishGame:function(e,t,n,a){return function(r){r({type:"GAME_SCORES",room:e,scores:n}),A(t[a])}}})(Object(U.a)(G)),z=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this,e))).componentDidMount=function(){n.getLeaderboardInfo()},n.doGetScores=Object(q.a)(C.a.mark(function e(){var t;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"/api/scores",e.prev=1,e.next=4,fetch("/api/scores",{method:"get",headers:{"Content-Type":"application/json"}});case 4:t=e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return");case 10:return e.abrupt("return",t);case 11:case"end":return e.stop()}},e,this,[[1,7]])})),n.getLeaderboardInfo=function(){return n.doGetScores().then(function(e){200===e.status&&e.json().then(function(e){n.setState({scores:e})})})},n.state={scores:[]},n}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"leaderboardContainer"},o.a.createElement("h2",{className:"leaderboardHeader"},"Leaderboard - Top 25 Worldwide"),o.a.createElement("div",{className:"leaderboard"},o.a.createElement("table",null,o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Rank"),o.a.createElement("th",null,"Username"),o.a.createElement("th",null,"Score"))),o.a.createElement("tbody",null,this.state.scores.map(function(e,t){return o.a.createElement("tr",{className:t%2===0?"even":"odd",key:t},o.a.createElement("td",null,t+1),o.a.createElement("td",null,e.username),o.a.createElement("td",null,e.score))})))))}}]),t}(r.Component),R=n(203),L=n(200),M=n(106),x=n(105);function H(e){var t=e.input,n=e.label,a=e.type,r=e.onChange;return o.a.createElement("div",null,o.a.createElement("div",{className:"inputContainer"},r?o.a.createElement("input",Object.assign({},t,{type:a,placeholder:n,onChange:r||void 0})):o.a.createElement("input",Object.assign({},t,{type:a,placeholder:n}))))}var P=function(){var e=Object(q.a)(C.a.mark(function e(t){var n,a;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.confirm===t.password){e.next=2;break}return e.abrupt("return","Passwords do not match.");case 2:return"/api/signup",n={username:t.username,password:t.password},e.prev=4,e.next=7,fetch("/api/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 7:a=e.sent,e.next=13;break;case 10:return e.prev=10,e.t0=e.catch(4),e.abrupt("return","Failed to connect to server");case 13:if(400!==a.status){e.next=15;break}return e.abrupt("return","Invalid username/password");case 15:if(200===a.status){e.next=17;break}return e.abrupt("return","Failed to connect to server");case 17:return e.abrupt("return",a);case 18:case"end":return e.stop()}},e,this,[[4,10]])}));return function(t){return e.apply(this,arguments)}}(),D=function(e){function t(){var e,n;Object(m.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).handleSignUp=function(e){n.props.signUpUserAsync(e,n.props.history)},n.componentDidMount=function(){n.props.signUpUser()},n.componentDidUpdate=function(){n.props.loggedIn&&n.props.history.push("/")},n}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.handleSubmit,n=e.isSubmitting;return o.a.createElement("div",null,o.a.createElement("form",{onSubmit:t(this.handleSignUp)},o.a.createElement(M.a,{name:"username",type:"text",component:H,label:"Username"}),o.a.createElement(M.a,{name:"password",type:"password",component:H,label:"Password"}),o.a.createElement(M.a,{name:"confirm",type:"password",component:H,label:"Repeat password"}),o.a.createElement("div",{className:"signUpButtonContainer"},o.a.createElement("button",{type:"submit",disabled:n},"Sign up"))),this.props.signUp.loginError&&o.a.createElement("div",{className:"errorBox"},this.props.signUp.errorMsg))}}]),t}(o.a.Component),F=Object(x.a)({form:"signup"})(Object(l.b)(function(e){return{loggedIn:!!e.login&&e.login.loggedIn,signUp:e.signUp}},{signUpUser:function(){return{type:"SIGN_UP_USER"}},signUpUserAsync:function(e,t){return function(n){P(e).then(function(e){200===e.status?e.json().then(function(e){t.push("/"),n({type:"LOGIN_SUCCESS",payload:e}),n({type:"SIGN_UP_SUCCESS"})}):n({type:"SIGN_UP_ERROR",payload:{errorMsg:e}})})}}})(Object(U.a)(D))),W=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"signUpContainer"},o.a.createElement("div",{className:"signUpFormContainer"},o.a.createElement("span",null,"SIGN UP"),o.a.createElement(F,null)))}}]),t}(r.Component),J=function(){var e=Object(q.a)(C.a.mark(function e(){var t;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"/api/logout",e.prev=1,e.next=4,fetch("/api/logout",{method:"post"});case 4:t=e.sent,e.next=11;break;case 7:return e.prev=7,e.t0=e.catch(1),console.log("Issues logging out user."),e.abrupt("return",500);case 11:return e.abrupt("return",t.status);case 12:case"end":return e.stop()}},e,this,[[1,7]])}));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(q.a)(C.a.mark(function e(t){var n,a;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"/api/login",n={username:t.username,password:t.password},e.prev=2,e.next=5,fetch("/api/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 5:a=e.sent,e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(2),e.abrupt("return");case 11:return e.abrupt("return",a);case 12:case"end":return e.stop()}},e,this,[[2,8]])}));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(q.a)(C.a.mark(function e(){var t;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"/api/user",e.prev=1,e.next=4,fetch("/api/user",{method:"get",headers:{"Content-Type":"application/json"}});case 4:t=e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return");case 10:return e.abrupt("return",t);case 11:case"end":return e.stop()}},e,this,[[1,7]])}));return function(){return e.apply(this,arguments)}}(),X=function(e){function t(){var e,n;Object(m.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).onLogin=function(e){n.props.loginUserAsync(e,n.props.history)},n.componentDidUpdate=function(){n.props.loggedIn&&n.props.history.push("/")},n}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props,t=e.handleSubmit,n=e.isSubmitting;return o.a.createElement("div",null,o.a.createElement("form",{onSubmit:t(this.onLogin)},o.a.createElement(M.a,{name:"username",type:"text",component:H,label:"Username"}),o.a.createElement(M.a,{name:"password",type:"password",component:H,label:"Password"}),o.a.createElement("div",{className:"loginButtonContainer"},o.a.createElement("button",{type:"submit",disabled:n},"Log in"))),this.props.loginError&&o.a.createElement("div",{className:"errorBox"},"Unable to log in"))}}]),t}(o.a.Component),K=Object(x.a)({form:"login"})(Object(l.b)(function(e){return{loggedIn:!!e.login&&e.login.loggedIn,user:e.form.login?e.form.login.registeredFields:void 0,loginError:e.login?e.login.loginError:void 0}},{loginUserAsync:function(e,t){return function(n){n({type:"LOGIN_USER"}),B(e).then(function(e){200===e.status?e.json().then(function(e){t.push("/"),n({type:"LOGIN_SUCCESS",payload:e})}):n({type:"LOGIN_ERROR",payload:{}})})}}})(Object(U.a)(X))),V=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"loginContainer"},o.a.createElement("div",{className:"loginFormContainer"},o.a.createElement("span",null,"LOG IN"),o.a.createElement(K,null)))}}]),t}(r.Component),$=Object(l.b)()(Object(U.a)(V)),Z=n(28);function ee(e){var t=e.input,n=e.label,a=e.type;return o.a.createElement("div",{className:"quizMakerInputFieldContainer"},o.a.createElement("label",null,n),o.a.createElement(H,{label:n,input:t,type:a}))}var te=n(58),ne=n(121),ae=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(h.a)(t).call(this,e))).addAnswer=function(){n.setState(function(e){return{answers:Object(Z.a)(e.answers).concat(o.a.createElement(M.a,{name:"answer-"+e.answerCounter,type:"text",component:ee,label:"Answer "+(e.answerCounter+1),key:e.answerCounter,id:e.answerCounter})),answerCounter:e.answerCounter+1}})},n.canCreateQuestion=function(e){return void 0!==n.props.question&&e.answerCounter>0&&n.state.correctAnswer},n.addQuestion=function(){var e=n.props.dispatch;n.state.correctAnswer&&n.props.question&&n.state.quizName?n.setState(function(e){if(n.canCreateQuestion(e))return{questions:Object(Z.a)(e.questions).concat({question:n.props.question,answers:n.props.answers,correctAnswer:e.correctAnswer})}},function(){e(Object(te.a)("quizMaker")),n.clearAnswerFields()}):n.setState({answerError:"To create a new question, you need to write a question, supply the answers and choose the correct one."})},n.createQuiz=function(){n.state.questionCounter>0&&n.state.quizName&&n.doCreateQuiz().then(function(){n.setState({questionCounter:0,answerCounter:0,answers:[],answerError:"",correctAnswer:null}),n.props.history.push("/")})},n.clearAnswerFields=function(){n.setState(function(e){return{answers:[],answerCounter:0,correctAnswer:null,questionCounter:e.questionCounter+1,answerError:""}})},n.setCorrectAnswer=function(e){n.setState({correctAnswer:e,answerError:""})},n.doCreateQuiz=Object(q.a)(C.a.mark(function e(){var t,a;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"/api/quiz",a={quizName:n.state.quizName,questions:n.state.questions},e.prev=2,e.next=5,fetch("/api/quiz",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 5:t=e.sent,e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(2),e.abrupt("return","Failed to connect to server");case 11:return e.abrupt("return",t);case 12:case"end":return e.stop()}},e,this,[[2,8]])})),n.handleQuizNameChange=function(e){n.setState({quizName:e.target.value})},n.state={answerCounter:0,questionCounter:0,answers:[],questions:[],quizName:""},n}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.handleSubmit,a=t.isSubmitting;return o.a.createElement("div",{className:"quizMakerContainer"},o.a.createElement("h2",null,"Quiz Maker"),o.a.createElement(H,{name:"quizName",value:this.state.quizName,type:"text",label:"Quiz Name",onChange:this.handleQuizNameChange}),o.a.createElement("form",{onSubmit:n(this.createQuiz)},o.a.createElement(M.a,{name:"question",type:"text",component:ee,label:"Question"}),o.a.createElement("div",{className:"quizMakerQuestionContainer"},this.state.answers.map(function(e){return e})),o.a.createElement("label",null,"Correct answer"),o.a.createElement(ne.a,{onChange:function(t){return e.setCorrectAnswer(t.value)},className:"selectAnswer",options:this.props.answersWithId.map(function(e){return{value:e.id,label:e.answer}})}),this.state.answers.length<10&&this.props.answers.length===this.state.answerCounter&&o.a.createElement("div",{className:"addItemQuizButtonContainer"},o.a.createElement("button",{type:"button",onClick:function(){return e.addAnswer()}},"Add answer"),o.a.createElement("button",{type:"button",onClick:this.addQuestion},"Add question")),this.props.answers.length===this.state.answerCounter&&o.a.createElement("div",{className:"createQuizButtonContainer"},o.a.createElement("p",null,"Questions: ",this.state.questionCounter+"/10"," "),o.a.createElement("button",{type:"submit",disabled:a},"Finish Quiz")),this.props.answers.length!==this.state.answerCounter&&o.a.createElement("div",null,o.a.createElement("p",{className:"questionError"},"You need to fill in all answers")),""!==this.state.answerError&&o.a.createElement("div",null,o.a.createElement("p",{className:"questionError"},this.state.answerError))))}}]),t}(r.Component),re=Object(x.a)({form:"quizMaker"})(Object(l.b)(function(e){var t=[],n=[],a=void 0;return e.form.quizMaker&&e.form.quizMaker.values&&(Object.entries(e.form.quizMaker.values).sort().map(function(e){var a=e[0].split("-");"answer"===a[0]&&(t.push({id:a[1],answer:e[1]}),n.push(e[1]))}),a=Object.values(e.form.quizMaker.values)&&Object.values(e.form.quizMaker.values).length>1?Object.values(e.form.quizMaker.values)[0]:void 0),{answers:n,answersWithId:t,createdQuestions:e.form.quizMaker?Object.keys(e.form.quizMaker.registeredFields).length-1:-1,question:void 0!==a?a:void 0}},{})(Object(U.a)(ae)));function oe(e){var t=e.loggedIn;return o.a.createElement(R.a,null,(void 0===t||!t)&&o.a.createElement(L.a,{exact:!0,path:"/signup",component:W}),(void 0===t||!t)&&o.a.createElement(L.a,{exact:!0,path:"/login",component:$}),o.a.createElement(L.a,{exact:!0,path:"/game",component:Q}),o.a.createElement(L.a,{exact:!0,path:"/leaderboard",component:z}),o.a.createElement(L.a,{exact:!0,path:"/quizmaker",component:re}),o.a.createElement(L.a,{exact:!0,path:"/home",component:y}),o.a.createElement(L.a,{exact:!0,path:"/",component:y}),o.a.createElement(L.a,{path:"/game",component:Q}),o.a.createElement(L.a,{path:"/",component:y}))}var se=function(e){function t(){var e,n;Object(m.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).isLoggedIn=function(){return void 0!==n.props.loggedIn&&!0===n.props.loggedIn},n.doLogout=function(){n.props.logoutUser(n.props.history)},n.getLoggedInUser=function(){n.props.checkUserToken()},n.componentWillMount=function(){n.getLoggedInUser()},n}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"headerContainer"},o.a.createElement(f.a,{to:"/",className:"headerLink headerLogo"},"Quhoot"),o.a.createElement("div",{className:"headerNavigationContainer"},o.a.createElement(f.a,{to:"/quizmaker",className:"headerLink"},"Quizmaker"),o.a.createElement(f.a,{to:"/Leaderboard",className:"headerLink"},"Leaderboard"),!this.isLoggedIn()&&o.a.createElement(f.a,{to:"/login",className:"headerLink headerLogin"},"Log In"),!this.isLoggedIn()&&o.a.createElement(f.a,{to:"/signup",className:"headerLink headerSignUp"},"Sign Up"),this.isLoggedIn()&&o.a.createElement("div",{className:"headerLink",style:{borderWidth:"1px",borderColor:"black",borderStyle:"solid",margin:"1em",borderRadius:".1em"}},"USER - "+this.props.username),this.isLoggedIn()&&o.a.createElement("button",{onClick:this.doLogout,className:"headerLink headerSignUp"},"Log out")))}}]),t}(r.Component),ie=Object(l.b)(function(e){return{loggedIn:e.login.loggedIn,userId:e.login.user?e.login.user.user_id:void 0,username:e.login.user?e.login.user.username:void 0}},{logoutUser:function(e){return function(t){J().then(function(n){204===n&&(e.push("/"),t({type:"LOGOUT_SUCCESS"}))})}},checkUserToken:function(){return function(e){return Y().then(function(t){401!==t?200===t.status&&t.json().then(function(t){return e({type:"UPDATE_LOGIN_STATUS",payload:{user:t}}),!0}):e({type:"UPDATE_LOGIN_STATUS",payload:{user:void 0}})})}}})(Object(U.a)(se)),ue=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return o.a.createElement(c.a,null,o.a.createElement("div",null,o.a.createElement(ie,null),o.a.createElement(oe,{loggedIn:this.props.loggedIn})))}}]),t}(r.Component),ce=Object(l.b)(function(e){return{loggedIn:!!e.login&&e.login.loggedIn}})(ue);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var le=n(4),me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_USER":return console.log("LOGIN USER = START"),Object(le.a)({},e,{loginError:!1});case"LOGIN_SUCCESS":return Object(le.a)({},e,{loggedIn:!0,user:{userId:t.payload.user_id,username:t.payload.username}});case"LOGIN_ERROR":return console.log("LOGIN_ERROR"),Object(le.a)({},e,{loggedIn:!1,loginError:!0});case"LOGOUT_SUCCESS":return console.log("LOGOUT_SUCCESS"),Object(le.a)({},e,{loggedIn:!1});case"UPDATE_LOGIN_STATUS":console.log("UPDATE_LOGIN_STATUS",t.payload);var n=void 0!==t.payload.user,a=void 0!==t.payload.user?t.payload.user:void 0;return Object(le.a)({},e,{loggedIn:n,user:a});default:return e}},pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGN_UP_USER":return console.log("SIGN_UP_USER"),Object(le.a)({},e,{loginError:!1,errorMsg:void 0});case"SIGN_UP_ERROR":return console.log("SIGN_UP_ERROR"),Object(le.a)({},e,{loginError:!0,errorMsg:t.payload?t.payload.errorMsg:void 0});case"SIGN_UP_SUCCESS":return console.log("SIGN_UP_SUCCESS"),Object(le.a)({},e,{loginError:!1});default:return e}},de=n(23),he=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_USER_SOCKET":return console.log("AUTH_USER_SOCKET"),Object(le.a)({},e,{loginError:!1});case"AUTH_USER_SOCKET_ERROR":return console.log("AUTH_USER_SOCKET_ERROR"),Object(le.a)({},e,{loginError:!0,errorMsg:t.payload});case"START_GAME":return console.log("START_GAME"),Object(le.a)({},e,{loginError:!1,errorMsg:"TRYING TO START THE GAME"});case"HOST_GAME":return console.log("HOST_GAME"),Object(le.a)({},e,Object(de.a)({},t.room,{players:e.players&&e.players.length>0?Object(Z.a)(e[t.room].players).concat([t.username]):t.username,isHost:t.isHost,host:t.username,quizName:t.quizName,amountOfQuestions:t.amountOfQuestions}));case"JOIN_GAME":return console.log("JOIN_GAME"),console.log("players",t.players),Object(le.a)({},e,Object(de.a)({},t.room,{players:t.players,host:t.host,quizName:t.quizName,amountOfQuestions:t.amountOfQuestions}));case"PLAYER_JOIN":return e[t.room].players.includes(t.username)?e:Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{players:e[t.room].players instanceof Array?Object(Z.a)(e[t.room].players).concat([t.username]):[e[t.room].players,t.username]})));case"PLAYER_LEAVE":console.log("PLAYER_LEAVE"),console.log(t);var n=e[t.room].players.indexOf(t.username);return Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{players:Object(Z.a)(e[t.room].players.slice(0,n)).concat(Object(Z.a)(e[t.room].players.slice(n+1,n.length)))})));case"HOST_CHANGE":return console.log("HOST_CHANGE"),Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{host:t.username})));case"NEW_HOST":return console.log("NEW_HOST"),Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{isHost:!0})));case"GAME_STARTING":return console.log("GAME_STARTING"),Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{isStarting:!0,question:t.question,answers:t.answers})));case"GAME_STARTED":return console.log("GAME_STARTED"),Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{isStarting:!1,isStarted:!0})));case"NEXT_QUESTION":return console.log("NEXT_QUESTION"),Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{question:t.question,answers:t.answers,isStarting:!0,isStarted:!1})));case"LAST_QUESTION":return console.log("LAST_QUESTION"),Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{question:t.question,answers:t.answers,isStarting:!0,isStarted:!1,lastQuestion:t.lastQuestion})));case"GAME_SCORES":return console.log("GAME_SCORES"),Object(le.a)({},e,Object(de.a)({},t.room,Object(le.a)({},e[t.room],{scores:t.scores})));default:return e}},ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];switch((arguments.length>1?arguments[1]:void 0).type){case"INCREASE_GAMES_PLAYED":return console.log("INCREASED THE GAMES"),Object(Z.a)(e).concat([{}]);case"SET_HIGHSCORE":return Object(Z.a)(e).concat([{}]);default:return e}},fe=n(107),Ee=Object(u.c)({login:me,signUp:pe,game:he,Leaderboard:ge,form:fe.a}),be=n(119),Oe=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||u.d,ve=Object(u.e)(Ee,Oe(Object(u.a)(be.a)));i.a.render(o.a.createElement(l.a,{store:ve},o.a.createElement(c.a,null,o.a.createElement(ce,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[147,2,1]]]);
//# sourceMappingURL=main.d878cba6.chunk.js.map