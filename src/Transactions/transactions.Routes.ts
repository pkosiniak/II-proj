import { Router, Response, Request, NextFunction } from 'express';
import * as transactions from './transactions.Controller';

const router = Router();

const asyncMiddleware = (fn: any, str: string) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(e => {
			console.log(e);
			console.log(str);
			next();
		});
	};

// transactions.get(all)
router.get('/', asyncMiddleware(transactions.getAll, "non-critical error from transactions.getAll"));
// transactions.put(new)
router.put('/', transactions.addNew);
// transactions.ById.get(one)
router.get('/:transactionId', transactions.getById);
// transactions.ById.post(update)
router.patch('/:transactionId', transactions.redraw);

export default router;
