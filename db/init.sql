DROP TABLE IF EXISTS project;

CREATE TABLE project (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  title           VARCHAR(50) UNIQUE,
  genre           ENUM('Web'),
  desc_slug       VARCHAR(255) UNIQUE,
  body            VARCHAR(255) UNIQUE
);

INSERT INTO project(title, desc_slug, genre) VALUES(
  'eResume (Version 3)',
  'eResume_v3.html',
  'Web'
), (
  'eResume (Version 2)',
  'eResume_v2.html',
  'Web'
), (
  'eResume (Version 1)',
  'eResume_v1.html',
  'Web'
);
