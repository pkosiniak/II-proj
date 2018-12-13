import { Request, Response } from 'express';
import { isUUID } from 'validator';
import { getRepository } from 'typeorm';
import { Bill } from './Bill';


const billRepository = getRepository(Bill);

// getAllBillsFromDB.find
export const getAll = async (req: Request, res: Response) => {
	//getBillsFromDB
	//req.query.userId
	// getBillsFromDB(req.query)
	// getBillsFromDB({userId: 6757})

	const model = await billRepository.find();
	res.json(model);
}

// addBill
export const add = (req: Request, res: Response) => {
	if (!req.body) {
		res.sendStatus(400);
	}
	// createBillLogic
	billRepository.create(req.body);
	res.sendStatus(201);
}

// getBillById
export const getByID = async (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// getBillByIdFromDB
	const model = await billRepository.findOne(req.params.id);
	res.json(model);
	res.sendStatus(200);
};

// closeBillById
export const closeById = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	billRepository.update(req.params.id, req.body);
	// closingBillsLogic
	res.sendStatus(201);
};
