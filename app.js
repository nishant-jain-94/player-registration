const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const players = [];

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.post('/player',(req, res) => {
    players.push(req.body);
    console.log(req.body);
    res.json(req.body);
});


app.listen(8080);