USE fabulist_db;

INSERT INTO stories (name, createdAt, updatedAt)
VALUES
('Gangsters and Robots', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Swindlers Of The North', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cats and Assassins', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- SELECT * FROM stories;

INSERT INTO players (name, email, createdAt, updatedAt)
values ('Pete', null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Andy', null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Allison', null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Betty', null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Ruth', null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
       
-- SELECT * FROM players;       

DROP TABLE IF EXISTS turns;

CREATE TABLE turns (
  id INT NOT NULL AUTO_INCREMENT,
  body VARCHAR(500) NOT NULL,
  illustration BINARY DEFAULT NULL,
  StoryId INT DEFAULT NULL,
  PlayerId INT DEFAULT NULL,
  createdAt DATETIME DEFAULT NULL,
  updatedAt DATETIME DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO turns (body, illustration, StoryId, PlayerId, createdAt, updatedAt)
VALUES 
("In a galaxy far, far away.", null, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("In a hole in the ground there lived a hobbit.", null, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("And they lived happily ever after.", null, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Terror made me cruel", null, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Some men get the world, some men get ex-hookers and a trip to Arizona.", null, 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("The only people for me are the mad ones.", null, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("It was a bright cold day in April, and the clocks were striking thirteen.", null, 3, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("We were the people who were not in the papers. ", null, 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("It sounds plausible enough tonight, but wait until tomorrow.", null, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);




