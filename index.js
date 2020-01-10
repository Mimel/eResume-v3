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

      console.log(structuredOut);

      res.render('projects', {projects: structuredOut});
    }
  });
});

app.get('/project_retrieve/:project_slug', (req, res, next) => {
  fs.readFile('./proj/' + req.params.project_slug, 'utf8', (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
