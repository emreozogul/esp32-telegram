import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { bot } from './bot';
import apiRoutes from './routes/api';
import statusRoutes from './routes/status';
import axios from 'axios';
import { webhookCallback } from 'grammy';

config();

const app = express();
app.use(bodyParser.json());

// Webhook setup
const webhookPath = `/webhook/${process.env.TELEGRAM_TOKEN}`;
app.post(webhookPath, webhookCallback(bot, 'express'));

// API Routes
app.use('/api', apiRoutes);
app.use('/status', statusRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        const response = await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/setWebhook`, {
            url: `${process.env.PUBLIC_URL}${webhookPath}`
        });
        console.log('Webhook set:', response.data);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error('Error setting webhook:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
});