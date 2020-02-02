const pjson = require('./package.json');
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const createLongPolling = require("express-longpoll");
const config = require("./configuration");

const DrawBoard = require('./DrawBoard');

const app = express()

var qs = require('querystring')


express.json();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const db = new DrawBoard(config.drawingBoard);

const longPolling = createLongPolling(app, { DEBUG: true });

const port = process.env.PORT || 80;

longPolling.create('/event')
longPolling.create('/progression')

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
            db.clearBoard();
            handleImgEvents(req.body.actionLog);
            longPolling.publish('/event', { action: 'img', actionItems: req.body.actionLog });
        }
        else if (req.body.action == 'clear-img') {
            db.clearBoard();
            longPolling.publish('/event', { action: 'clear-img' });
        }
    }
    res.sendStatus(201);
});

app.post('/progression', (req, res) => {
    var keys = Object.keys(req.body);
    var body = qs.parse(keys[0]);
    if (body.action) {
        if (body.action == 'init') {
            longPolling.publish('/progression', body);
        }
        if (body.action == 'progression') {
            longPolling.publish('/progression', body);
        }
    }
    res.sendStatus(200);

});

app.listen(port, () => console.log(`GGJ20 backend listening on port ${port}!`))
