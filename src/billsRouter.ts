import { Router } from 'express';
import { isUUID } from 'validator';

const bills = Router();

// getAllBills
bills.get('/', (req, res) => {
	//getBillsFromDB
	res.json({ field: 'history' });
});

// addBill
bills.post('/', (req, res) => {
	if (!req.body) {
		res.send(400);
	}
	// createBillLogic
	res.send(201);
});

// getBillById
bills.get('/:id', (req, res) => {
	if (!isUUID(req.params.id)) {
		res.send(400);
	}
	// getBillByIdFromDB
	res.json({ field: 'target' });
	res.send(200);
});

// closeBillById
bills.post('/:id', (req, res) => {
	if (!isUUID(req.params.id)) {
		res.send(400);
	}
	// closingBillsLogic
	res.send(201);
});

export default bills;
