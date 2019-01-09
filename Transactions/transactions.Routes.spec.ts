import agent from 'supertest';
import app from '../app';

describe('transactions resource', () => {

	describe('get all transactions', () => {
		it('should return an object on GET (on /transactions) with a field: "field" equal 3',
			async () => {
				const response = await agent(app).get('/transactions');
				expect(response.status).toBe(200);
				expect(response.body.field).toBe(3);
			});
	});

	describe('by ID', () => {
		describe('add specified transaction', () => {

			it('should respond to PUT (on /transaction/randomUUID) with 201',
				async () => {
					const response = await agent(app)
						.put('/transactions/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.status).toBe(201);
				});

			it('should respond to PUT (on /transaction/noUUID) with 400',
				async () => {
					const response = await agent(app)
						.put('/transactions/919d4d94-e218-1fe8-9f32-f2801f1b94dG');
					expect(response.status).toBe(400);
				});
		});

		describe('get specific transaction', () => {
			it('should respond to GET (on /transaction/UUID) with 200',
				async () => {
					const response = await agent(app)
						.get('/transactions/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.status).toBe(200);
				});

			it('should respond to GET (on /transaction/noUUID) with 400',
				async () => {
					const response = await agent(app)
						.get('/transactions/919d4d94-e218-1fe8-9f32-f2801f1b94dG');
					expect(response.status).toBe(400);
				});
		});

		describe('redraw specific transaction', () => {
			it('shoud respond to PATCH (on /transaction/UUID) with 200',
				async () => {
					const response = await agent(app)
						.patch('/transactions/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.status).toBe(200);
				});

			it('should respond to PATCH (on /transaction/noUUID) with 400',
				async () => {
					const response = await agent(app)
						.patch('/transactions/919d4d94-e218-1fe8-9f32-f2801f1b94dG');
					expect(response.status).toBe(400);
				});
		});
	});
});
