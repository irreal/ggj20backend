const pjson = require('./package.json');
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const createLongPolling = require("express-longpoll");

const app = express()


express.json();
app.use(cors());
app.use(bodyParser.json());

const longPolling = createLongPolling(app, { DEBUG: true });

const port = process.env.PORT || 80;

longpollWithDebug.create('/event')

app.get('/', (req, res) => res.send({ message: `service appears to be up and running :) Version: ${pjson.version}` }))
app.post('/event', (req, res) => {
    console.log('evo eventa!', req.body);
    if (req.body.action) {
        // eventQueue.push(req.body);
        longpollWithDebug.publish('/event', req.body);
    }
    res.sendStatus(201);
});

app.listen(port, () => console.log(`GGJ20 backend listening on port ${port}!`))
