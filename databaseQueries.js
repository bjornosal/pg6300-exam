module.exports = {
	createUserInformationTableQuery: `CREATE TABLE IF NOT EXISTS user_information (
	user_id SERIAL, 
	username varchar(255) UNIQUE, 
	password varchar(255),
	score int,
	PRIMARY KEY(user_id));`,

	createQuizTableQuery: `CREATE TABLE IF NOT EXISTS quiz (
	quiz_id SERIAL,
	name varchar(255) UNIQUE,
	madeby INT,
	PRIMARY KEY (quiz_id),
	FOREIGN KEY(madeby) REFERENCES user_information(user_id)
);`,

	createQuestionTableQuery: `CREATE TABLE IF NOT EXISTS question (
	question_id SERIAL, 
	quiz_id int, 
	question varchar(255),
	answers varchar(255) [], 
	correct int,
	PRIMARY KEY (question_id),
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id)
);`,

	createNewUserWithUsernameQuery: `INSERT INTO user_information (username, password, score)
	VALUES($1, $2, $3) RETURNING *`,

	createNewQuizQuery: `INSERT INTO quiz(name) VALUES($1)
	ON CONFLICT ON CONSTRAINT quiz_name_key DO NOTHING RETURNING *;`,

	createNewQuestionQuery: `INSERT INTO question(quiz_id, question, answers, correct)
	VALUES($1, $2, $3, $4);`,

	findUserWithUsername: `SELECT * FROM user_information WHERE username = $1;`,

	getAmountOfQuizzes: `SELECT COUNT(*) FROM quiz;`,

	getQuizById: `SELECT * from quiz WHERE quiz_id = $1;`,

	getAllQuestionsByQuizId: `SELECT * from question where quiz_id = $1;`,
	
	updateScoreOfUser: `UPDATE user_information SET score = score + $1 WHERE user_id = $2;`,

	getAllUserNamesWithScores: `SELECT username, score FROM user_information ORDER BY score DESC LIMIT 25;`
};
