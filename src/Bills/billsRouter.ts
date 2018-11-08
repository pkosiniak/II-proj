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
		res.sendStatus(400);
	}
	// createBillLogic
	res.sendStatus(201);
});

// getBillById
bills.get('/:id', (req, res) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// getBillByIdFromDB
	res.json({ field: 'target' });
	res.sendStatus(200);
});

// closeBillById
bills.post('/:id', (req, res) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// closingBillsLogic
	res.sendStatus(201);
});

export default bills;
