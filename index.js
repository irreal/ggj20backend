const pjson = require('./package.json');
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const createLongPolling = require("express-longpoll");
const config = require("./configuration");

const DrawBoard = require('./DrawBoard');

const app = express()


express.json();
app.use(cors());
app.use(bodyParser.json());

const db = new DrawBoard(config.drawingBoard);

const longPolling = createLongPolling(app, { DEBUG: true });

const port = process.env.PORT || 80;

longPolling.create('/event')

const handleImgEvents = function (data) {
    data.forEach(item => {
        db.setCoords(item.x, item.y, item.action);
    });
}

app.get('/', (req, res) => res.send({ message: `service appears to be up and running :) Version: ${pjson.version}` }))
app.get('/board', (req, res) => res.send({ action: 'img', board: db.getBoard() }));
app.post('/event', (req, res) => {
    console.log('evo eventa!', req.body);
    if (req.body.action) {
        if (req.body.action == 'img') {
            handleImgEvents(req.body.actionLog);
            longPolling.publish('/event', { action: 'img', board: db.getBoard() });
        }
        else if (req.body.action == 'clear-img') {
            db.clearBoard();
            longPolling.publish('/event', { action: 'clear-img' });
        }
    }
    res.sendStatus(201);
});

app.listen(port, () => console.log(`GGJ20 backend listening on port ${port}!`))
