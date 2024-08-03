"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const bot_1 = require("./bot");
const api_1 = __importDefault(require("./routes/api"));
const status_1 = __importDefault(require("./routes/status"));
const axios_1 = __importDefault(require("axios"));
const grammy_1 = require("grammy");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const webhookPath = `/webhook/${process.env.TELEGRAM_TOKEN}`;
app.post(webhookPath, (0, grammy_1.webhookCallback)(bot_1.bot, 'express'));
// API Routes
app.use('/api', api_1.default);
app.use('/status', status_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        const response = await axios_1.default.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/setWebhook`, {
            url: `${process.env.PUBLIC_URL}${webhookPath}`
        });
        console.log('Webhook set:', response.data);
    }
    catch (error) {
        console.error('Error setting webhook:', error);
    }
});
