import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('should get the /api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('should get the /api/resize endpoint', async () => {
    const response = await request.get('/api/resize');
    expect(response.status).toBe(200);
  });
});
