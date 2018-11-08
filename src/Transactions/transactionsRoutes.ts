import { Router } from 'express';
import { isUUID } from 'validator';

const transactions = Router();
transactions.get('/', (req, res) => {
   // pobrac dane z bazy
   // na podstawie jakichś parametrow
   // zwrocic do uzytkownika
   // getAllTransactions
   res.json({ field: 3 });
});

transactions.put('/:id', (req, res) => {
   if (!isUUID(req.params.id)) {
      res.sendStatus(400);
   }
   // addNewTransaction
   res.sendStatus(201);
});

transactions.get('/:id', (req, res) => {
   if (!isUUID(req.params.id)) {
      res.sendStatus(400);
   }
   // getTransactionsById
   res.sendStatus(200);
});

transactions.patch('/:id', (req, res) => {
   if (!isUUID(req.params.id)) {
      res.sendStatus(400);
   }
   // redrawTransaction
   res.sendStatus(200);
});

export default transactions;
