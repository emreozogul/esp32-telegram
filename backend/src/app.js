const express = require('express');
const bodyParser = require('body-parser');
const statusRoutes = require('./routes/statusRoutes');
const telegramRoutes = require('./routes/telegramRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api', statusRoutes);
app.use('/telegram', telegramRoutes);

module.exports = app;