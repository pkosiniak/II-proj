import { Router } from 'express';
import { isUUID } from 'validator';

const transactions = Router();
transactions.get('/', (req, res) => {
   // pobrac dane z bazy
   // na podstawie jakichś parametrow
   // zwrocic do uzytkownika

   res.json({ field: 3 });
})

transactions.put('/:id', (req, res) => {
   if (!isUUID(req.params.id)) {
      res.send(400);
   }
   // do some logic
   res.send(201);
})
// transactionRouter
//    .get(...)
//    .get(.....)
//    .post(...)
//    .

export default transactions;
