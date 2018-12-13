import { Router } from 'express';
import * as bills from './bills.Controller'
const router = Router();

// getAllBills
router.get('/', bills.getAll);

// addBill
router.post('/', bills.add);

// getBillById
router.get('/:id', bills.getByID);

// closeBillById
router.post('/:id', bills.closeById);

export default router;
