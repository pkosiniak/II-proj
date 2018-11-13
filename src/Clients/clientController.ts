import { Request, Response } from 'express';
import { isUUID } from 'validator';


export const getAll = (req: Request, res: Response) => {
	// getClients
	res.json({ field: 'client' });
}

export const add = (req: Request, res: Response) => {
	if (!req.body) {
		res.sendStatus(400);
	}
	// addClient
	res.sendStatus(200);
}

export const getByID = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// getBillByIdFromDB
	res.json({ field: 'target' });
	res.sendStatus(200);
}

export const putById = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}

	// addClient
	res.sendStatus(200);
}

export const patchByID = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}

	// addClient
	res.sendStatus(200);
}




