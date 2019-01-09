import { Request, Response, NextFunction } from 'express';
import { isUUID } from 'validator';
import { Transaction } from './Transaction';
import { getRepository } from 'typeorm';

const transactionRepository = getRepository(Transaction);

// transactions.get(all)
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	const ordeByrParam = req.params.orderby as string;
	const ascParam = req.params.asc as boolean;

	const model = await transactionRepository.find({
		loadRelationIds: true,
		order: {
			id: ordeByrParam === 'id' ? ascParam ? 'ASC' : 'DESC' : undefined,
			amount: ordeByrParam === 'amount' ? ascParam ? 'ASC' : 'DESC' : undefined,
			date: ordeByrParam === 'date' ? ascParam ? 'ASC' : 'DESC' : undefined,
			isWithdrawn: ordeByrParam === 'isWithdrawn' ? ascParam ? 'ASC' : 'DESC' : undefined,
			bill: ordeByrParam === 'bill' ? ascParam ? 'ASC' : 'DESC' : undefined
		}
	});
	res.json(model);
}

// transactions.put(new)
export const addNew = (req: Request, res: Response) => {
	if (!req.body || !isUUID(req.body.id)) {
		res.sendStatus(400);
		return;
	}
	transactionRepository.save(req.body);
	res.sendStatus(201);
}

// transactions.ById.get(one)
export const getById = async (req: Request, res: Response, next: NextFunction) => {
	if (!isUUID(req.params.transactionId)) {
		res.sendStatus(400);
		return;
	}
	const model = await transactionRepository.findOne(req.params.transactionId, { loadRelationIds: true });
	res.json(model);
}

// transactions.ById.post(update)
export const redraw = (req: Request, res: Response, next: NextFunction) => {
	if (!isUUID(req.params.transactionId)) {
		res.sendStatus(400);
		return;
	}
	transactionRepository.update(req.params.transactionId, { amount: 0, isWithdrawn: true });
	res.sendStatus(200);
}

// const orderByMidleware = (req: Request, collumn: string) => {
// 	req.params.order === collumn ?
// }


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
