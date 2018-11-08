import agent from 'supertest';
import app from './app';

describe('bills history', () => {
	it('should return an object with a filed \'filed\' equal \'history\'',
		async () => {
			const response = await agent(app).get('/bills');
			expect(response.body.field).toBe('history');
		});
	describe('get target bill', () => {

		// create new bill
		it('shoud respond to GET on /bills/someID with 200 and field:\'target\'',
			async () => {
				const response = await agent(app)
					.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
				expect(response.status).toBe(200);
				expect(response.body.field).toBe('target');
			});

		it('should respond to GET to /bills/noUUID with 400',
			async () => {
				const response = await agent(app)
					.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fdG');
				expect(response.status).toBe(400);
			});

		// close the bill
		it('shoud respond to POST on /bills/someID with 200',
			async () => {
				const response = await agent(app)
					.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
				expect(response.status).toBe(201);
			});

		it('should respond to POST to /bills/noUUID with 400',
			async () => {
				const response = await agent(app)
					.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fdG');
				expect(response.status).toBe(400);
			});
	});

	describe('add new bill', () => {
		it('should respond to PUT with req.body[.noJSONfield] to /bills with 400',
			async () => {
				const response = await agent(app).post('/bills');
				expect(response.status).toBe(400);
			});
	});
});
