const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/', express.static(path.join(__dirname, '/views')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
