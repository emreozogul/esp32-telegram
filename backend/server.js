const app = require('./src/app');
const config = require('./src/config/config');
const telegramService = require('./src/services/telegramService');

const port = config.port;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

telegramService.bot.on('message', (msg) => {
    require('./src/controllers/telegramController').handleMessage(msg);
});