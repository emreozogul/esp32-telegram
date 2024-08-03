jest.mock('node-telegram-bot-api');
jest.mock('../src/services/telegramService');
jest.mock('../src/controllers/statusController');

const TelegramBot = require('node-telegram-bot-api');
const telegramService = require('../src/services/telegramService');
const statusController = require('../src/controllers/statusController');
const telegramController = require('../src/controllers/telegramController');

describe('Telegram Controller', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();

        // Mock the TelegramBot constructor and sendMessage method
        TelegramBot.mockImplementation(() => ({
            sendMessage: jest.fn().mockResolvedValue({}),
        }));
    });

    test('handleMessage should process open command', () => {
        const msg = { chat: { id: 123 }, text: 'open' };
        telegramController.handleMessage(msg);

        expect(statusController.setStatus).toHaveBeenCalledWith('open');
        expect(telegramService.sendMessage).toHaveBeenCalledWith(123, 'Watering system turned on');
    });

    test('handleMessage should process close command', () => {
        const msg = { chat: { id: 456 }, text: 'close' };
        telegramController.handleMessage(msg);

        expect(statusController.setStatus).toHaveBeenCalledWith('close');
        expect(telegramService.sendMessage).toHaveBeenCalledWith(456, 'Watering system turned off');
    });

    test('handleMessage should handle invalid commands', () => {
        const msg = { chat: { id: 789 }, text: 'invalid' };
        telegramController.handleMessage(msg);

        expect(statusController.setStatus).not.toHaveBeenCalled();
        expect(telegramService.sendMessage).toHaveBeenCalledWith(789, 'Invalid command. Use "open" or "close".');
    });
});