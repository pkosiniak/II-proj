import express from 'express';
import transactionsRouter from './Transactions/transactionsRoutes';
import billsRouter from './Bills/billsRouter';
import clientRouter from './Clients/clientRouter'


const app = express();

// const rootDirController: RequestHandler = (req, res) => {
//    res.send('test udany')
// }

app.use('/transactions', transactionsRouter);
app.use('/bills', billsRouter);
app.use('/clients', clientRouter);


// app.get('/', rootDirController);
// app.use('/bills', billsHandler);
// app.use('/users', usersHandler);
export default app;
