import agent from 'supertest';
import app from '../app';

describe('bills history', () => {

	describe('get bills', () => {
		it('should return on GET (on /bills) an object with a filed: "filed" equal "history".',
			async () => {
				const response = await agent(app).get('/bills');
				expect(response.body.field).toBe('history');
				// expect(response.status).toBe(200);
			});
	});

	describe('add new bill', () => {
		it('should respond to PUT (with !req.body on /bills) with 400',
			async () => {
				const response = await agent(app).post('/bills');
				expect(response.status).toBe(400);
			});
	});

	describe('by ID', () => {
		describe('get target bill', () => {

			// create new bill
			it('shoud respond to GET (on /bills/UUID) with 200',
				async () => {
					const response = await agent(app)
						.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.body.field).toBe('target');
				});

			it('shoud return an object to GET (on /bills/UUID) with filed: "filed" equal "target"',
				async () => {
					const response = await agent(app)
						.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.body.field).toBe('target');
				});

			it('should respond to GET to /bills/noUUID with 400',
				async () => {
					const response = await agent(app)
						.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fdG');
					expect(response.status).toBe(400);
				});
		});

		describe('add target bill', () => {
			// close the bill
			it('shoud respond to POST (on /bills/UUID) with 200',
				async () => {
					const response = await agent(app)
						.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.status).toBe(200);
				});

			it('should respond to POST (on /bills/noUUID) with 400',
				async () => {
					const response = await agent(app)
						.get('/bills/919d4d94-e218-11e8-9f32-f2801f1b9fdG');
					expect(response.status).toBe(400);
				});
		});
	});
});
