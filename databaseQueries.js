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
	answer_1 varchar(255), 
	answer_2 varchar(255),
	answer_3 varchar(255),
	answer_4 varchar(255),
	correct varchar(255),
	PRIMARY KEY (question_id),
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id)
);`,

	createNewUserWithUsernameQuery: `INSERT INTO user_information (username, password)
	VALUES($1, $2)`,

	createNewQuizQuery: `INSERT INTO quiz(name) VALUES($1)
	ON CONFLICT ON CONSTRAINT quiz_name_key DO NOTHING RETURNING *`,

	createNewQuestionQuery: `INSERT INTO question(quiz_id, question, answer_1, answer_2, answer_3, answer_4, correct)
	VALUES($1, $2, $3, $4, $5, $6, $7)`,

	findUserWithUsername: `SELECT * FROM USER_INFORMATION WHERE USERNAME = $1`
};
