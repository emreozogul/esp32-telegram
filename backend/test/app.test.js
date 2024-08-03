const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
    test('GET /api/status should return status', async () => {
        const res = await request(app)
            .get('/api/status')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('command');
    });
});