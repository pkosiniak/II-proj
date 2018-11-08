import agent from 'supertest';
import app from './app';

describe('transactions resource', () => {
   describe('adding transaction', () => {
      // it('should add transaction sent by user', async () => {
      it('should respond to PUT to /transaction/randomUUID with 201', async () => {
         const response = await agent(app)
            .put('/transactions/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
         expect(response.status).toBe(201);
      });

      it('should respond to PUT to /transaction/noUUID with 400', async () => {
         const response = await agent(app)
            .put('/transactions/919d4d94-e218-1fe8-9f32-f2801f1b94dG');
         expect(response.status).toBe(400);
      });
   });

   it('should return an object with a field \'field\' equal 3', async () => {
      const response = await agent(app).get('/transactions');
      expect(response.status).toBe(200);
      expect(response.body.field).toBe(3);
   });
});
