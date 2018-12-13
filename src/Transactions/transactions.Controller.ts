import { Request, Response, NextFunction } from 'express';
import { isUUID } from 'validator';
import { Transaction } from './Transaction';
import { getRepository } from 'typeorm';

const transactionRepository = getRepository(Transaction);

// getAllTransactions.find
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	// na podstawie jakichś parametrow
	const model = await transactionRepository.find();
	res.json(model);
}

// getTransactionsById.findById
export const getById = async (req: Request, res: Response, next: NextFunction) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	const model = await transactionRepository.findOne(req.params.id);
	res.json(model);

}

// addNewTransaction.create
export const addNew = (req: Request, res: Response) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	transactionRepository.save(req.body);
	res.sendStatus(201);
}

// redrawTransaction.updateById
export const redraw = (req: Request, res: Response, next: NextFunction) => {
	if (!isUUID(req.params.id)) {
		res.sendStatus(400);
	}
	transactionRepository.update(req.params.id, req.body);
	res.sendStatus(200);
}


// const errorCatchingMiddleware = (fn: any) =>
// (req: Request, res: Response, next: NextFunction) => {
// 	try{
// 		fn(req, res, next);
// 	}
// 	catch{
// 		...
// 	}
// };

// 	const doSthMore = (fn: any) =>
// 	(a, b, c) => {
// 		console.log("before call")
// 		const ret = fn(a, b, c);
// 		console.log("after call")
// 		return ret

// 		try{
// 			fn(req, res, next);
// 		}
// 		catch{
// 			...
// 		}
// 	};

// export const someFunc = doSthMore(doSomeStuff);

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
