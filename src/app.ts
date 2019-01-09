import express from 'express';
import transactionsRouter from './Transactions/transactions.Routes';
import billsRouter from './Bills/bills.Routes';
import clientRouter, {unSafeRouter as unSafeClientRouter} from './Clients/client.Routes'
import sessions from 'express-session'
import passportAuth from './security/PassportAuth';
import roles from './security/Roles';
import { secret, adminRole, clientRole } from './security/Secret.Security';
import bodyParser from 'body-parser';


const app = express();
app.use(sessions({ secret: secret, resave: true, saveUninitialized: true }));
app.use(passportAuth.authMiddlewares);

app.get('/callback', passportAuth.callbackFunction, (req, res) => {
	if (!req.user)
		throw new Error('user null');
	res.redirect("/");
});

app.get('/login', passportAuth.loginFunction, (req, res) => {
	res.redirect("/");
});

app.use(roles.middleware());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send(sendSlash);
})

// only for admin
app.use('/transactions', roles.is(adminRole), transactionsRouter);

// only for admin
app.use('/bills',roles.is(adminRole), billsRouter);

app.use('/clients', clientRouter);

// testing:
app.get('/test', (req, res) => {
	res.send({ 'Dzien Dobry!': 'Chyba', 'Zaloguj się': '/login' });
});

app.get('/testC', roles.is(clientRole), (req, res) => {
	res.send({ 'Hello for our Client!': 'Unless you\'re an Admin', 'Client': ' can access this page' })
});

app.get('/testA', roles.is(adminRole), (req, res) => {
	res.send({ 'Only Admin': 'can access this page', 'You can be anywere': 'Why here?' })
});

// unSafe -- TESTING ONLY !!!
app.use('/unsafe/clients', unSafeClientRouter);
app.use('/unsafe/transactions', transactionsRouter);
app.use('/unsafe/bills', billsRouter);


export default app;

const sendSlash = {
	'Possible paths': {
		login: '/login',
		clients: '/clients',
		clientBiId: {
			byId: '/clients/{client_id}',
			bills: '/clients/{client_id}/bills',
			billById: '/clients/{client_id}/bills/{bill_id}'
		},
		bills: '/bills',
		billById: '/bills/{bill_id}',
		transactions: '/transactions',
		transactionById: '/transactions/{transaction_id}'
	},
	'Can access': {
		'Everyone': ['/login', '/test'],
		'Client': ['/clients/{client_id}', '/clients/{client_id}/bills', '/clients/{client_id}/bills/{bill_id}', '/testC'],
		'Admin': ['{everywere}', '/testA']
	}
}
