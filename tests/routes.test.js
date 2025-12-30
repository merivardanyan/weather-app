const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

describe('GET /weather/raw', () => {
    it('returns 400 if no city', async () => {
        const response = await request(app).get('/api/weather/raw');
        expect(response.statusCode).toBe(400);
    });
});