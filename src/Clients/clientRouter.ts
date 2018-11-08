import { Router } from 'express';
import { isUUID } from 'validator';

const client = Router();

client.get('/', (req, res) => {
	// getClients
	res.json({ field: 'client' });
});

client.post('/', (req, res) => {
	if (!req.body) {
		res.sendStatus(400);
	}
	// addClient
	res.sendStatus(200);
})

client.get('/:id', (req, res) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// getBillByIdFromDB
	res.json({ field: 'target' });
	res.sendStatus(200);
})

client.put('/:id', (req, res) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}

	// addClient
	res.sendStatus(200);
})

client.patch('/:id', (req, res) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}

	// addClient
	res.sendStatus(200);
})




export default client;
