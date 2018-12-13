import { Request, Response } from 'express';
import { isUUID } from 'validator';
import { getRepository } from 'typeorm';
import { Client } from './Client';

const clientRepository = getRepository(Client);
// getClients.find
export const getAll = async (req: Request, res: Response) => {
	const model = await clientRepository.find();
	res.json(model);
}

// addClient.create
export const add = (req: Request, res: Response) => {
	if (!req.body) {
		res.sendStatus(400);
	}
	clientRepository.create(req.body);
	res.sendStatus(200);
}

// getClientById.findById
export const getByID = async (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	const model = await clientRepository.findOne(req.params.id)
	res.json(model);
	res.sendStatus(200);
}

// updateClientDataById
export const updateById = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	clientRepository.update(req.params.id, req.body)
	res.sendStatus(200);
}

// anonimizeById.updateById
export const anonimizeByID = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	clientRepository.update(req.params.id, req.body)
	res.sendStatus(200);
}




