import agent from 'supertest';
import app from './app';

describe('root request', () => {
   it('should return 404', async () => {
      const response = await agent(app).get('/');
      expect(response.status).toBe(404);
   });
});
