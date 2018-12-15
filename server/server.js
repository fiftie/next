const cwd = process.cwd();
const path = require('path');
const express = require('express');
const app = express();

// config of view engin
const viewDirectory = path.join(cwd, '/server/view');
app.set('views', viewDirectory);
app.set('view engine', 'pug');

// config of static files directory
app.use(express.static(cwd + '/client'));

// rooting
app.get('/', (req, res, next) => {
  const attributes = {};
  res.render('index', attributes);
})

// listen
app.listen(3000, () => console.log('port 3000'));