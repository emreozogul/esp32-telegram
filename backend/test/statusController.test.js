const statusController = require('../src/controllers/statusController');

describe('Status Controller', () => {
    test('getStatus should return the last command', () => {
        const req = {};
        const res = {
            json: jest.fn()
        };

        statusController.setStatus('open');
        statusController.getStatus(req, res);

        expect(res.json).toHaveBeenCalledWith({ command: 'open' });
    });
});