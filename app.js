const path = require('path');
const express = require('express');
const request = require('request');
const env = require('node-env-file');
const bodyParser = require('body-parser');
const app = express();

env(path.join(__dirname, 'player-registration.env'));

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
  
  request({
    uri: 'https://api.travis-ci.org/repo/nishant-jain-94%2Fquestion-authoring/requests',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Travis-API-Version": 3,
      "Authorization": `token ${process.env.AUTHORIZATION_TOKEN}` 
    },
    json: true,
    body: {
      "request": {
        "branch": "master"
      }
    }
  }, (error, response, body) => {
    console.log(error);
    console.log(response);
    console.log(body);
    if(!error) {
     console.log("Build triggered successfully");
    } else {
      console.log("Error in triggering build");
    }
  });
  
  res.json(req.body);
});


app.listen(app.get('port'), () => {
  console.log(`Player Registration listening on port ${app.get('port')}`);
});