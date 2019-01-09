import { Request, Response, NextFunction } from 'express';
import { isUUID } from 'validator';
import { getRepository, DeleteResult, DeepPartial } from 'typeorm';
import { Bill } from './Bill';


const billRepository = getRepository(Bill);

// bills.get(all) -> READ
export const getAll = async (req: Request, res: Response) => {

	let closed = req.query.closed ? req.query.closed === 'true' ? true : false : false;

	const model = await billRepository.find({
		loadRelationIds: { relations: ['client'] },
		where: { isClosed: closed }
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
	const model = await billRepository.findOne(req.params.billId, { loadRelationIds: { relations: ['client', 'transactions'] } });
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
export const updateById = async (req: Request, res: Response) => {
	if (!isUUID(req.params.billId) || !req.body) {
		res.sendStatus(400);
		return;
	}
	const model = await billRepository.findOne(req.params.billId)
	if (!model) {
		res.sendStatus(400);
		return;
	}

	if (req.body.client)
		billRepository.update(req.params.billId, { client: req.body.client });
	if (req.body.amount) {
		billRepository.update(req.params.billId, { state: model.state - req.body.amount });
	}
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

