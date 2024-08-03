const telegramService = require('../services/telegramService');
const statusController = require('./statusController');

exports.handleMessage = (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text.toLowerCase();

    if (messageText === 'open' || messageText === 'close') {
        statusController.setStatus(messageText);
        telegramService.sendMessage(chatId, `Watering system ${messageText === 'open' ? 'turned on' : 'turned off'}`);
    } else {
        telegramService.sendMessage(chatId, 'Invalid command. Use "open" or "close".');
    }
};