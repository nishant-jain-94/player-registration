const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const players = [];

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/players', (req, res) => {
  res.json(players);
});

app.get('/players/repo', (req, res) => {
  const listOfPlayersRepository = players.map((player) => player.repo)
  res.json(listOfPlayersRepository);
});

app.post('/player',(req, res) => {
  players.push(req.body);
  res.json(req.body);
});


app.listen(app.get('port'), () => {
  console.log(`Player Registration listening on port ${app.get('port')}`);
});