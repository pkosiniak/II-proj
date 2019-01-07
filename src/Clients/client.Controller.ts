import { Request, Response } from 'express';
import { isUUID } from 'validator';
import { getRepository, createQueryBuilder } from 'typeorm';
import { Client } from './Client';
import { Bill } from '../Bills/Bill';

const clientRepository = getRepository(Client);

// client.get(all)
export const getAll = async (req: Request, res: Response) => {
	const model = await clientRepository.find();
	res.json(model);
}

// client.post(new)
export const add = (req: Request, res: Response) => {
	if (!req.body) {
		res.sendStatus(400);
	}
	clientRepository.save(req.body);
	res.sendStatus(200);
}

// client.ById.get(one)
export const getByID = async (req: Request, res: Response) => {
	if (!isUUID(req.params.userId)) {
		res.sendStatus(400);
	}
	const model = await clientRepository.findOne(req.params.userId, { relations: ['bills'] });

	res.json(model);
	// res.sendStatus(200);
}

// client.ById.put(update)
export const updateById = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	clientRepository.update(req.params.id, req.body) // TODO: nie całe body
	res.sendStatus(200);
}

// client.ById.post(anonimize)
export const anonimizeByID = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	clientRepository.update(req.params.id, req.body) // TODO: nie całe body
	res.sendStatus(200);
}

// client.ById.Bills(clientBills)
export const getByIdBills = async (req: Request, res: Response) => {
	if (!isUUID(req.params.userId)) {
		res.sendStatus(400);
	}
	const model = await createQueryBuilder().select('bills').from(Client, 'client')
		.innerJoin('client.bills', 'bills')
		.whereInIds(req.params.id).getRawMany();

	res.json(model);
}

// client.ById.Bills.ById.get(clientBill.ById)
export const getByIdOneBill = async (req: Request, res: Response) => {
	if (!isUUID(req.params.userId)) {
		res.sendStatus(400);
	}
	const model = await getRepository(Bill).findOne(req.params.bill_id, { relations: ['transactions'] });
	res.json(model);
}



