const express = require('express');
const bodyParser = require('body-parser');
const telegramController = require('./src/controllers/telegramController');
const config = require('./src/config/config');
const telegramService = require('./src/services/telegramService');

const app = express();
app.use(bodyParser.json());

app.post(`/webhook/${config.telegramToken}`, (req, res) => {
    const update = req.body;
    if (update.message) {
        telegramController.handleMessage(update.message);
    }
    res.sendStatus(200);
});

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Set up the webhook with Telegram once the server starts
    telegramService.setWebhook(`${config.apiUrl}/webhook/${config.telegramToken}`);
});