import agent from 'supertest';
import app from '../app'

describe('clients collection', () => {

	describe('get all clients', () => {
		it('should return on GET (on /clients) an object with a filed: "filed" equal "client"',
			async () => {
				const response = await agent(app).get('/clients');
				expect(response.body.field).toBe('client');
			});
	});

	describe('add new client', () => {
		it('should response on POST (on /clients with !req.body) with 400',
			async () => {
				const response = await agent(app).post('/clients');
				expect(response.status).toBe(400);
			});
	});

	describe('by ID', () => {
		describe('get the client', () => {
			it('should respond to GET (on /clients/UUID) with 200', // an object    and filed \'filed\' equal \'target\''
				async () => {
					const response = await agent(app)
						.get('/clients/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.status).toBe(200);
				});

			it('should return an object to GET (on /clients/UUID) with filed "filed" equal "target"',
				async () => {
					const response = await agent(app)
						.get('/clients/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.body.field).toBe('target');
				});

			it('should respond to GET (on /clients/noUUID) with 400 ',
				async () => {
					const response = await agent(app)
						.get('/clients/919d4d94-e218-11e8-9f32-f2801f1b9fdG');
					expect(response.status).toBe(400);
				});
		});

		describe('update (put ?) the client)', () => {
			it('should response on PUT (on /clients/UUID) with 200 ',
				async () => {
					const response = await agent(app)
						.put('/clients/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.status).toBe(200);
				});

			it('should response on PUT (on /clients/noUUID) with 400 ',
				async () => {
					const response = await agent(app)
						.put('/clients/919d4d94-e218-11e8-9f32-f2801f1b9fdG');
					expect(response.status).toBe(400);
				});
		});

		describe('delete (pstch ?) the client', () => {
			it('should response on PATCH (on /clients/UUID) with 200 ',
				async () => {
					const response = await agent(app)
						.patch('/clients/919d4d94-e218-11e8-9f32-f2801f1b9fd1');
					expect(response.status).toBe(200);
				});

			it('should response on PATCH (on /clients/noUUID) with 400 ',
				async () => {
					const response = await agent(app)
						.patch('/clients/919d4d94-e218-11e8-9f32-f2801f1b9fdG');
					expect(response.status).toBe(400);
				});
		});
	});
	//
});
