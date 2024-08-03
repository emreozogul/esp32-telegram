const axios = require('axios');
const config = require('../config/config');

class TelegramService {
    constructor() {
        this.apiUrl = `https://api.telegram.org/bot${config.telegramToken}`;
    }

    async sendMessage(chatId, text) {
        try {
            const response = await axios.post(`${this.apiUrl}/sendMessage`, {
                chat_id: chatId,
                text: text
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    async setWebhook(url) {
        try {
            const response = await axios.post(`${this.apiUrl}/setWebhook`, {
                url: url
            });
            console.log('Webhook set:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error setting webhook:', error);
            throw error;
        }
    }
}

module.exports = new TelegramService();