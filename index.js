const express = require('express')
express.json();
var cors = require('cors');
var bodyParser = require('body-parser')
const app = express()
app.use(cors());
app.use(bodyParser.json());
const port = 3000

let eventQueue = [];

app.get('/', (req, res) => res.send({ message: "hello svete" }))
app.post('/event', (req, res) => {
    console.log('evo eventa!', req.body);
    if (req.body.action) {
        eventQueue.push(req.body);
    }
    res.sendStatus(201);
});
app.get('/event', (req, res) => {
    if (eventQueue.length === 0) {
        res.send({});
    }
    else {
        res.send(eventQueue[0]);
        eventQueue = eventQueue.slice(1);
        console.log('nakon slanja queue: ', eventQueue);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))