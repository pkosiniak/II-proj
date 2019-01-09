import { Request, Response, NextFunction } from 'express';
import { isUUID } from 'validator';
import { getRepository, DeleteResult, DeepPartial } from 'typeorm';
import { Bill } from './Bill';


const billRepository = getRepository(Bill);

// bills.get(all) -> READ
export const getAll = async (req: Request, res: Response) => {
	const model = await billRepository.find({
		loadRelationIds: { relations: ['client'] }
	});
	res.json(model);
}

// bills.post(new) -> CREATE
export const add = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body) {
		res.sendStatus(400);
		return;
	}
	billRepository.save(req.body);
	res.sendStatus(201);
}

// bills.ById.get(one) -> READ_ONE
export const getByID = async (req: Request, res: Response) => {
	if (!isUUID(req.params.billId)) {
		res.sendStatus(400);
		return;
	}
	// getBillByIdFromDB
	const model = await billRepository.findOne(req.params.billId, { loadRelationIds: {relations: ['client', 'transactions']} });
	res.json(model);
};

// bills.ById.put(close) -> UPDATE
export const closeById = (req: Request, res: Response) => {
	if (!isUUID(req.params.billId) || !req.body) {
		res.sendStatus(400);
		return;
	}
	// closingBillsLogic
	if (!req.body.isClosed)
		res.sendStatus(400);

	billRepository.update(req.params.billId, {
		isClosed: req.body.isClosed,
		state: req.body.state,
		endDate: new Date(Date.now())
	});
	res.sendStatus(200);
};

// bills.ById.post(close) -> UPDATE
export const updateById = (req: Request, res: Response) => {
	if (!isUUID(req.params.billId) || !req.body || !req.body.client) {
		res.sendStatus(400);
		return;
	}

	const model = billRepository.findOne(req.params.billId).then((result) => {
		return !result || result.client ? undefined : result
	});
	if (!model) {
		res.sendStatus(400);
		return;
	}

	billRepository.update(req.params.billId, { client: req.body.client });
	res.sendStatus(200);
};

// bills.ById.delete(close) -> Deleted
export const deleteById = (req: Request, res: Response) => {
	if (!isUUID(req.params.billId))
		res.sendStatus(400);
	const model = billRepository.findOne(req.params.billId).then((result) => {
		return !result || result.transactions || result.client || result.state != 0 ?
			undefined : result;
	})
	if (!model) {
		res.sendStatus(400);
		return;
	}
	billRepository.delete(req.params.billId)
	res.sendStatus(200);
}


