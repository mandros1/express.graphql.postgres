
CREATE TABLE users (
	ID SERIAL PRIMARY KEY,
	firstName VARCHAR(30) NOT NULL,
	lastName VARCHAR(30) NOT NULL,
	email VARCHAR(30) UNIQUE NOT NULL,
	age integer NOT NULL
);

INSERT INTO users (firstName, lastName, email, age)
	VALUES ('Marin', 'Andros', 'marinandros031@gmail.com', 25), ('Ivana', 'Runje', 'ivanarunje@gmail.com', 25), ('Josip', 'Markovic', 'markovic@gmail.com', 24);
	
SELECT * from users;


CREATE TABLE project (
	ID SERIAL PRIMARY KEY,
	author_id integer NOT NULL,
	created_at TIMESTAMP NOT NULL,
	title VARCHAR(50),
	description VARCHAR(300),
	CONSTRAINT fk_project_user
		FOREIGN KEY (author_id)
		REFERENCES users(ID)
);

INSERT INTO project (author_id, created_at, title, description)
	VALUES (4, current_timestamp, 'Book of How Amazing This Author IS', 'This book is about how amazing Marin Andros is, which is a lot.');
	
SELECT * from project;


SELECT * FROM users LEFT JOIN project ON users.id = project.author_id WHERE project.author_id IS NULL;
