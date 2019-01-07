import express from 'express';
import transactionsRouter from './Transactions/transactions.Routes';
import billsRouter from './Bills/bills.Routes';
import clientRouter from './Clients/client.Routes'
import sessions from 'express-session'
import passportAuth from './security/PassportAuth';
import roles from './security/Roles';
import { secret, adminRole } from './security/Secret.Security';


const app = express();
app.use(sessions({ secret: secret, resave: true, saveUninitialized: true }));
app.use(passportAuth.authMiddlewares);

app.get('/callback', passportAuth.callbackFunction, (req, res) => {
	if (!req.user) {
		throw new Error('user null');
	}
	res.redirect("/");
});

app.get('/login', passportAuth.loginFunction, (req, res) => {
	res.redirect("/");
});

app.use(roles.middleware());

// only for admin
app.use('/transactions', roles.is(adminRole), transactionsRouter);
// only for admin
app.use('/bills', billsRouter);

app.use('/clients', clientRouter);

app.get('/', (req, res) => {
	res.send({ clients: '/clients', bills: '/bills', transactions: '/transactions' });
})

app.get('/test', (req, res) => {
	res.send('dzien dobry');
});

app.get('/test1', roles.is(adminRole), (req, res) => {
	res.send('admin can only access')
});

export default app;
