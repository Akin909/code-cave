BEGIN;

DROP TABLE IF EXISTS users, codebase CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL
);

CREATE TABLE codebase (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  code VARCHAR(500) NOT NULL
);

INSERT INTO users (firstname, surname, username) VALUES
('Akin', 'Test', 'Akin909');


INSERT INTO codebase (user_id, code) VALUES
('1','() => fn => next => fn(next)'),
('1','function(name){\nconsole.log("Hello World")}');

COMMIT;
