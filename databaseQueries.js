module.exports = {
  createUserInformationTableQuery: `CREATE TABLE IF NOT EXISTS user_information (
	user_id SERIAL, 
	username varchar(255) UNIQUE, 
	password varchar(255),
    score int,
    PRIMARY KEY(user_id));`,

  createQuizTableQuery: `CREATE TABLE IF NOT EXISTS quiz (
	quiz_id SERIAL,
	name varchar(255),
	PRIMARY KEY (quiz_id)
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
);`
};
