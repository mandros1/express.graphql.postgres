-- Database: graphql

-- DROP DATABASE graphql;

CREATE DATABASE graphql
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Croatian_Croatia.1250'
    LC_CTYPE = 'Croatian_Croatia.1250'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
	
CREATE TABLE users (
	ID SERIAL PRIMARY KEY,
	firstName VARCHAR(30) NOT NULL,
	lastName VARCHAR(30) NOT NULL,
	email VARCHAR(30),
	age integer NOT NULL
);

INSERT INTO users (firstName, lastName, email, age)
	VALUES ('Marin', 'Andros', 'marinandros031@gmail.com', 25), ('Ivana', 'Runje', 'ivanarunje@gmail.com', 25), ('Josip', 'Markovic', NULL, 24);
	
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
	VALUES (1, current_timestamp, 'Book of How Amazing This Author IS', 'This book is about how amazing Marin Andros is, which is a lot.');
	
SELECT * from project;