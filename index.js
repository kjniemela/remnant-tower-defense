const express = require('express');
const path = require('path');

const app = express();

const port = 3005;
const ADDR_PREFIX = '/remnant-tower-defense';

app.use(`${ADDR_PREFIX}/`, express.static(path.join(__dirname, 'static')))
app.use(`${ADDR_PREFIX}/assets`, express.static(path.join(__dirname, 'assets')))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})