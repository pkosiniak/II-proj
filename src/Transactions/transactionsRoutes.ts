import { Router } from 'express';
import * as transactions from './transactionsController';

const router = Router();

router.get('/', transactions.getAll);
router.put('/:id', transactions.addNew);
router.get('/:id', transactions.getById);
router.patch('/:id', transactions.redraw);

export default router;
