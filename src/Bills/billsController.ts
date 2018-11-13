import { Request, Response } from 'express';
import { isUUID } from 'validator';


// getAllBills
export const getAll = (req: Request, res: Response) => {
	//getBillsFromDB

	//req.query.userId

	// getBillsFromDB(req.query)
	// getBillsFromDB({userId: 6757})

	res.json({ field: 'history' });
}

// addBill
export const add = (req: Request, res: Response) => {
	if (!req.body) {
		res.sendStatus(400);
	}
	// createBillLogic
	res.sendStatus(201);
}

// getBillById
export const getByID = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// getBillByIdFromDB
	res.json({ field: 'target' });
	res.sendStatus(200);
};

// closeBillById
export const closeById = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// closingBillsLogic
	res.sendStatus(201);
};
