SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS link;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS thumbnail;
SET FOREIGN_KEY_CHECKS = 1;

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
  CONSTRAINT fk_l_proj_id
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
  CONSTRAINT fk_i_proj_id
    FOREIGN KEY (project_id)
    REFERENCES project(id)
);

CREATE TABLE thumbnail (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  url             VARCHAR(255),
  image_id        INT,
  CONSTRAINT fk_image_id
    FOREIGN KEY (image_id)
    REFERENCES image(id)
);

INSERT INTO project(title, short_desc, text_slug, genre) VALUES(
  'eResume (Version 3)',
  'My current ePortfolio, the one you\'re seeing right now. Made with Node Express and other libraries, Handlebars, SASS, and MySQL.',
  'eresume_v3.html',
  'Web'
), (
  'eResume (Version 2)',
  'My previous ePortfolio. Made with Angular.',
  'eresume_v2.html',
  'Web'
);

/* eResume-v3 */

SELECT @eRes3Id := id FROM project WHERE title = 'eResume (Version 3)';
INSERT INTO link(site, `text`, url, project_id) VALUES(
  'live',
  'Home Page',
  'https://mattimel.com',
  @eRes3Id
), (
  'GitHub',
  'GitHub Repository',
  'https://github.com/Mimel/eResume-v3',
  @eRes3Id
);

INSERT INTO image(url, caption, width, height, project_id) VALUES(
  'images/eResume-v3/fullsize_image.jpg',
  'This is a sample fullsize image.',
  1920,
  1080,
  @eRes3Id
);

INSERT INTO thumbnail(url, image_id) VALUES(
  'images/eResume-v3/fullsize_image_thumb.jpg',
  LAST_INSERT_ID()
);

INSERT INTO image(url, caption, width, height, project_id) VALUES(
  'images/eResume-v3/medium_image.jpg',
  'This is a sample mediumsize image.',
  500,
  500,
  @eRes3Id
);

INSERT INTO thumbnail(url, image_id) VALUES(
  'images/eResume-v3/medium_image_thumb.jpg',
  LAST_INSERT_ID()
);

/* eResume-v2 */

SELECT @eRes2Id := id FROM project WHERE title = 'eResume (Version 2)';

INSERT INTO link(site, `text`, url, project_id) VALUES(
  'GitHub',
  'GitHub Repository',
  'https://github.com/Mimel/eResume-v2',
  @eRes2Id
);

INSERT INTO image(url, caption, width, height, project_id) VALUES(
  'images/eResume-v2/desktop_page.jpg',
  'This is a sample fullsize image.',
  1920,
  1080,
  @eRes2Id
);

INSERT INTO thumbnail(url, image_id) VALUES(
  'images/eResume-v2/desktop_page_thumbnail.jpg',
  LAST_INSERT_ID()
);

INSERT INTO image(url, caption, width, height, project_id) VALUES(
  'images/eResume-v2/mobile_page.jpg',
  'This is a sample mediumsize image.',
  1080,
  2220,
  @eRes2Id
);

INSERT INTO thumbnail(url, image_id) VALUES(
  'images/eResume-v2/mobile_page_thumbnail.jpg',
  LAST_INSERT_ID()
);
