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

router.get('/', asyncMiddleware(transactions.getAll, "non-critical error from transactions.getAll"));
router.put('/:id', transactions.addNew);
router.get('/:id', transactions.getById);
router.patch('/:id', transactions.redraw);

export default router;
