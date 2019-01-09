import { Router, Request, Response, NextFunction } from 'express';
import * as client from './client.Controller';
import { add as billAdd } from '../Bills/bills.Controller'
//@ts-ignore
import roles from '../security/Roles';
import { clientRole, adminRole } from '../security/Secret.Security';


const router = Router();

const addBillMiddleware = (fn: any) =>
	(req: Request, res: Response, next: NextFunction) => {
		req.body = { client: req.params.userId };
		fn(req,res,next);
	}


// router.get('/', roles.is(adminRole), client.getAll);

// router.post('/', roles.is(adminRole), client.add)

// router.get('/:userId', roles.is(clientRole), client.getByID)

// router.put('/:userId', roles.is(adminRole), client.updateById)

// router.post('/:userId', roles.is(adminRole), client.anonimizeByID)

// router.get('/:userId/bills', roles.is(clientRole), client.getByIdBills)

// router.post('/:userId/bills', roles.is(adminRole), billAdd)

// router.get('/:userId/bills/:billId', roles.is(clientRole), client.getByIdOneBill)

// test without login:
router.get('/', client.getAll);

router.post('/', client.add)

router.get('/:userId', client.getByID)

router.put('/:userId', client.updateById)

router.post('/:userId', client.anonimizeByID)

router.get('/:userId/bills', client.getByIdBills)

router.post('/:userId/bills', addBillMiddleware(billAdd))

router.get('/:userId/bills/:billId', client.getByIdOneBill)

// router.get('/:userId/bills/:billId/transaction', client.getByIdOneBill)

export default router;
