import { Router } from 'express';
import * as bills from './bills.Controller'
const router = Router();

// getAllBills
router.get('/', bills.getAll);

// addBill
router.post('/', bills.add);

// bills.ById.get(one) -> READ_ONE
router.get('/:billId', bills.getByID);

// bills.ById.put(close) -> UPDATE
router.put('/:billId', bills.closeById);

// bills.ById.post(update) -> UPDATE
router.post('/:billId', bills.updateById);

// bills.ById.delete(close) -> Deleted
router.delete('/:billId', bills.deleteById);


export default router;
