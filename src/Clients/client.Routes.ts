import { Router, Request, Response, NextFunction } from 'express';
import { isUUID } from 'validator';
import * as client from './client.Controller';
//@ts-ignore
import a from 'passport';

// import { getAll as getAllBills } from '~/Bills/billsController'

const router = Router();
const authUser = (req: Request, res: Response, next: NextFunction) => {
	// if(req.user.id !== req.params.userId)
	// 	res.sendStatus(403);
	next();
}

router.get('/', client.getAll);

router.post('/', client.add)

router.get('/:userId', client.getByID)

// // podobne do /bills?userId=:userId
// client.get('/:userId/bills', authUser,
// 	(req, res, next) => {
// 		req.query.userId = req.params.userId;
// 		next();
// 	},
// 	getAllBills)

// podobne do /bills?userId=:userId

router.get('/:userId/bills', authUser,
	(req, res) => {
		if (!isUUID(req.params.userId)) {
			res.sendStatus(400);
		}
		// getBillsFromDB({userId: req.params.userId})
		// getBillsFromDBbyUserId(req.params.userId)
		res.json({ field: 'target' });
		res.sendStatus(200);
	})

// client.get('/:userId/bills/:billId', authUser,
// 	(req, res) => {

// 	})

// client.get('/:userId/bills/:billId/transactions', authUser,
// 	(req, res) => {

// 	})

// client.get('/:userId/bills/:billId/transactions/:transactionId', authUser,
// 	(req, res) => {

// 	})

router.put('/:id', client.updateById)

router.patch('/:id', client.anonimizeByID)




export default router;
