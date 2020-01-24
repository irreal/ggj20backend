const express = require('express')
express.json();
const app = express()
const port = 3000

app.get('/', (req, res) => res.send({ message: "hello svete" }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))