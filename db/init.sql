CREATE TABLE project (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  title     VARCHAR(50) UNIQUE,
  genre     ENUM('Web'),
  body      VARCHAR(255) UNIQUE
);

INSERT INTO project(title, genre) VALUES(
  'eResume (Version 3)',
  'Web'
), (
  'eResume (Version 2)',
  'Web'
), (
  'eResume (Version 1)',
  'Web'
);
