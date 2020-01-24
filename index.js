const express = require('express')
express.json();
var cors = require('cors');
const app = express()
app.use(cors());
const port = 3000

app.get('/', (req, res) => res.send({ message: "hello svete" }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))