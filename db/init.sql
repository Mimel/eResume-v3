DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS link;
DROP TABLE IF EXISTS image;

CREATE TABLE project (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  title           VARCHAR(50) UNIQUE,
  short_desc      VARCHAR(1023),
  genre           ENUM('Web'),
  text_slug       VARCHAR(255) UNIQUE
);

CREATE TABLE link (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  site            ENUM('default', 'live', 'download', 'GitHub'),
  `text`          VARCHAR(255),
  url             VARCHAR(255),
  project_id      INT,
  CONSTRAINT fk_proj_id
    FOREIGN KEY (project_id)
    REFERENCES project(id)

);

CREATE TABLE image (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  url             VARCHAR(255),
  caption         VARCHAR(1023),
  width           INT,
  height          INT,
  project_id      INT,
  CONSTRAINT fk_proj_id
    FOREIGN KEY (project_id)
    REFERENCES project(id)
);

INSERT INTO project(title, short_desc, text_slug, genre) VALUES(
  'eResume (Version 3)',
  'My current ePortfolio, the one you\'re seeing right now. Made with Node Express and other libraries, Handlebars, SASS, and MySQL.',
  'eResume_v3.html',
  'Web'
), (
  'eResume (Version 2)',
  'My previous ePortfolio. Made with Angular.',
  'eResume_v2.html',
  'Web'
), (
  'eResume (Version 1)',
  'My very first ePortfolio. Made with basic HTML, CSS, and JS.',
  'eResume_v1.html',
  'Web'
);
