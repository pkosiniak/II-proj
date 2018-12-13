import express, { Request } from 'express';
import transactionsRouter from './Transactions/transactions.Routes';
import billsRouter from './Bills/bills.Routes';
import clientRouter from './Clients/client.Routes'
import passport from 'passport';
import sessions from 'express-session'
import { Strategy as LocalStrategy } from 'passport-local'
const ConnectRoles = require('connect-roles');

const user = new ConnectRoles();

const app = express();
app.use(sessions({ secret: 'kjbgsDJBKGSsGGSDNKLSJB;sgdkjbss', resave: true, saveUninitialized: true }));

passport.use(new LocalStrategy((username, password, done) => {

	return done(null, { id: 666 });
}));

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	let user;
	let err;
	if (id === 666) { user = { id: 666 }; }
	else { err = "no deserializacja poszla cos nie tak as in nie ma takiego usera" }
	done(err, user);
});

app.use(passport.initialize());
app.use(passport.session());
app.use(user.middleware());


//anonymous users can only access the home page
//returning false stops any more rules from being
//considered
user.use((req: Request, action: string) => {
	if (!req.isAuthenticated()) return action === 'access home page';
	return undefined;
})

//moderator users can access private page, but
//they might not be the only ones so we don't return
//false if the user isn't a moderator
user.use('access private page', (req: Request) => {
	if (req.user.role === 'moderator') {
		return true;
	}
	return undefined;

})

//admin users can access all pages
user.use((req: Request) => {
	if (req.user.role === 'admin') {
		return true;
	}
	return undefined;
});


// const rootDirController: RequestHandler = (req, res) => {
//    res.send('test udany')
// }

app.get('/login', passport.authenticate('local', { failureMessage: true }), (req, res) => {
	res.send('no zalogowany no');
})

app.get('/test', (req, res) => {
	res.send('dzien dobry');
});

app.get('/test2', user.can('test access'), (req, res) => {
	res.send('uja do yja');
});

// only for admin
app.use('/transactions', transactionsRouter);
// only for admin
app.use('/bills', billsRouter);


app.use('/clients', clientRouter);


// app.get('/', rootDirController);
// app.use('/bills', billsHandler);
// app.use('/users', usersHandler);
export default app;
