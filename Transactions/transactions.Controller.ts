import { Request, Response, NextFunction } from 'express';
import { isUUID } from 'validator';
import { Transaction } from './Transaction';
import { getRepository } from 'typeorm';

const transactionRepository = getRepository(Transaction);

// transactions.get(all)
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	// const transactionFieldList = ['id', 'amount', 'date', 'isWithdrawn', 'bill']


	let ascParam = req.query.asc;
	if (typeof ascParam == 'object')
		ascParam = ascParam[0];
	ascParam ? ascParam === 'true' ? true : false : true;

	let orderBy = req.query.orderby;
	if (typeof (orderBy) == 'object')
		orderBy = orderBy[0];

	const model = await transactionRepository.find({
		loadRelationIds: true,
		order: {
			id: orderBy === 'id' ? ascParam ? 'ASC' : 'DESC' : undefined,
			amount: orderBy === 'amount' ? ascParam ? 'ASC' : 'DESC' : undefined,
			date: orderBy === 'date' ? ascParam ? 'ASC' : 'DESC' : undefined,
			isWithdrawn: orderBy === 'isWithdrawn' ? ascParam ? 'ASC' : 'DESC' : undefined,
			bill: orderBy === 'bill' ? ascParam ? 'ASC' : 'DESC' : undefined
		}
	});
	res.json(model);
}

export const addBody = async (req: Request, res: Response, next: NextFunction) => {

	if (!req.body || !isUUID(req.body.id))
		return false;
	const model = await transactionRepository.findOne(req.body.id);
	if (!model || model.id == req.body.id)
		return false;

	transactionRepository.save(req.body);
	return true;
}

// transactions.put(new)
export const add = (req: Request, res: Response, next: NextFunction) => {
	addBody(req, res, next) ? res.sendStatus(201) : res.sendStatus(400);
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

// transactions.ById.post(redraw)
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
