import { Router, Request, Response, NextFunction } from 'express';
import * as client from './client.Controller';
import { add as addBill, updateById as updateBill } from '../Bills/bills.Controller'
import { addBody as addTransaction } from '../Transactions/transactions.Controller'
//@ts-ignore
import roles from '../security/Roles';
import { clientRole, adminRole } from '../security/Secret.Security';


export const unSafeRouter = Router();
const router = Router();

const addBillMiddleware = (fn: any) =>
	(req: Request, res: Response, next: NextFunction) => {
		req.body = { client: req.params.userId };
		fn(req, res, next);
	}

const addTransactionMiddleware = (fn: any) =>
	async (req: Request, res: Response, next: NextFunction) => {
		req.body.bill = req.params.billId;
		const result = await addTransaction(req, res, next);
		result ? fn(req, res) :
		res.sendStatus(400);

	}

// client.get(all)
router.get('/', roles.is(adminRole), client.getAll);

// client.post(new)
router.post('/', roles.is(adminRole), client.add)

// client.ById.get(one)
router.get('/:userId', roles.is(clientRole), client.getByID)

// client.ById.put(update)
router.put('/:userId', roles.is(adminRole), client.updateById)

// client.ById.post(anonimize)
router.post('/:userId', roles.is(adminRole), client.anonimizeByID)

// client.ById.Bills.get(clientBills)
router.get('/:userId/bills', roles.is(clientRole), client.getByIdBills)

// client.ById.Bills.post(newBillToClient)
router.post('/:userId/bills', roles.is(adminRole), addBillMiddleware(addBill))

// client.ById.Bills.ById.get(clientBills)
router.get('/:userId/bills/:billId', roles.is(clientRole), client.getByIdOneBill)

// client.ById.Bills.ById.post(newTrasactionToBillToClient)
router.post('/:userId/bills/:billId', roles.is(adminRole), addTransactionMiddleware(updateBill))

// UNSAFE MODE
// test without login:
unSafeRouter.get('/', client.getAll);

unSafeRouter.post('/', client.add)

unSafeRouter.get('/:userId', client.getByID)

unSafeRouter.put('/:userId', client.updateById)

unSafeRouter.post('/:userId', client.anonimizeByID)

unSafeRouter.get('/:userId/bills', client.getByIdBills)

unSafeRouter.post('/:userId/bills', addBillMiddleware(addBill))

unSafeRouter.get('/:userId/bills/:billId', client.getByIdOneBill)

unSafeRouter.post('/:userId/bills/:billId', addTransactionMiddleware(updateBill))

export default router;
