const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');

const serverConn = mysql.createConnection({
  host: '127.0.0.1',
  database: 'eresume',
  user: 'root',
  password: ''
});

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/', express.static(path.join(__dirname, '/views')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/projects', (req, res) => {
  serverConn.query('SELECT * FROM project ORDER BY genre', (error, results, fields) => {
    if(error) {
      console.log(error);
    } else {
      var structuredOut = [];
      for(var i = 0; i < results.length; i++) {
        if(i == 0 || results[i].genre != results[i - 1].genre) {
          structuredOut.push({
            genre: results[i].genre,
            proj: [results[i]]
          });
        } else {
          structuredOut[structuredOut.length - 1].proj.push(results[i]);
        }
      }

      res.render('projects', {projects: structuredOut});
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project_retrieve/:project_slug', (req, res, next) => {
  var proj_data_query = mysql.format(
    'SELECT title, short_desc, site, `text`, url ' +
    'FROM project AS p LEFT JOIN link l ON p.id = l.project_id WHERE ?? = ?',
    ['text_slug', req.params.project_slug]
  );
  serverConn.query(proj_data_query, (d_error, d_results, d_fields) => {
    if(d_error) {
      console.log(d_error);
    } else {
      fs.readFile('./proj/' + req.params.project_slug, 'utf8', (err, data) => {
        if(err) {
          console.log(err);
        } else {
          var proj_images_query = mysql.format(
            'SELECT i.url AS url, t.url AS thumb_url, caption, width, height ' +
            'FROM project AS p LEFT JOIN image i ON p.id = i.project_id ' +
            'INNER JOIN thumbnail t ON i.id = t.image_id WHERE ?? = ?',
            ['text_slug', req.params.project_slug]
          );
          serverConn.query(proj_images_query, (i_error, i_results, i_fields) => {
            if(i_error) {
              console.log(i_error);
            } else {
              res.send({
                title: d_results[0].title,
                short_desc: d_results[0].short_desc,
                long_desc: data,
                links: d_results.map(function(row) {
                  return {
                    site: row.site,
                    text: row.text,
                    url: row.url
                  };
                }),
                image_info: i_results
              });
            }
          });
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
