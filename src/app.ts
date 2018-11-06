import express from 'express';
import transactionsRouter from './transactionsRoutes'

const app = express();

// const rootDirController: RequestHandler = (req, res) => {
//    res.send('test udany')
// }

app.use('/transactions', transactionsRouter);


// app.get('/', rootDirController);
// app.use('/bills', billsHandler);
// app.use('/users', usersHandler);
export default app;
