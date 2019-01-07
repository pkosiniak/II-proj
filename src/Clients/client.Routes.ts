import { Router } from 'express';
import * as client from './client.Controller';
//@ts-ignore
import roles from '../security/Roles';
import { clientRole, adminRole } from '../security/Secret.Security';


const router = Router();

router.get('/', roles.is(adminRole), client.getAll);

router.post('/', roles.is(adminRole), client.add)

router.get('/:userId', roles.is(clientRole), client.getByID)

router.put('/:userId', roles.is(adminRole), client.updateById)

router.post('/:userId', roles.is(adminRole), client.anonimizeByID)

router.get('/:userId/bills', roles.is(clientRole), client.getByIdBills)

router.get('/:userId/bills/:billId', roles.is(clientRole), client.getByIdOneBill)

export default router;
