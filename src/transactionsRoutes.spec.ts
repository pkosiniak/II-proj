import agent from 'supertest';
import app from './app';

describe('sample test', () => {
   it('should pass', async () => {
      const response = await agent(app).get('/');
      response.error;
      expect(false).toBe(false);
   });
});
