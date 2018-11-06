import { Router } from 'express';

const transactions = Router();
transactions.get('/', (req, res) => {
   // pobrac dane z bazy
   // na podstawie jakichś parametrow
   // zwrocic do uzytkownika

   res.json({ field: 3 });
})
// transactionRouter
//    .get(...)
//    .get(.....)
//    .post(...)
//    .

export default transactions;
