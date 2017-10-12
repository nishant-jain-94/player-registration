const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const players = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/player', (req, res) => {
  res.json(player);
});

app.post('/player',(req, res) => {
  players.push(req.body);
  res.json(req.body);
});


app.listen(8080);