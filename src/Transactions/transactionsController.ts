import { Request, Response } from 'express';
import { isUUID } from 'validator';

export const getAll = (req: Request, res: Response) => {
	// pobrac dane z bazy
	// na podstawie jakichś parametrow
	// zwrocic do uzytkownika
	// getAllTransactions
	res.json({ field: 3 });
}

export const addNew = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// addNewTransaction
	res.sendStatus(201);
}

export const getById = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// getTransactionsById
	res.sendStatus(200);
}


export const redraw = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	// redrawTransaction
	res.sendStatus(200);
}


// interface TestRequest extends Request {
// 	params: {
// 		id: string;
// 	}
// }

// import db from '';

// export const listAllTransactions = (req, res) => {
//    const transactions: any[] = [];
//    db.get('transactions');
//    res.json(transactions);
// }

// export const addTransaction = (transaction) => {
//    db.add(transaction);
// }
