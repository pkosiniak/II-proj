import passport from 'passport';
import { Strategy as Auth0Strategy } from 'passport-auth0';
import { Handler } from 'express';
import { rollesAddress, clientSecret, clientId, domain } from './Secret.Security';
import { getRepository } from 'typeorm';
import { Client } from '../Clients/Client';


const strategy = new Auth0Strategy(
	{
		domain: domain,
		clientID: clientId,
		clientSecret: clientSecret,
		callbackURL: '/callback',
		profileFields: ['app_metadata', 'last_ip'], // TODO: niepotrzebne

	},
	async (accessToken, refreshToken, extraParams, profile, done) => {
		if (profile._json[rollesAddress]) {
			(profile as any).role = profile._json[rollesAddress][0]
		}
		// req.params.userId
		// find w bazie clienta po userId
		const client = await getRepository(Client).findOne({ where: { oAuthId: profile.id } })
		if (!client)
			await getRepository(Client).save({ oAuthId: profile.id, name: profile.displayName })
		return done(null, profile);
	}
);
passport.serializeUser((user: any, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(strategy);

const passportAuthenticator = passport.initialize()
const passportSession: Handler = passport.session()

const callbackFunction = passport.authenticate('auth0', { failureRedirect: '/login' });

const loginFunction = passport.authenticate('auth0', {});

export default { callbackFunction, loginFunction, authMiddlewares: [passportAuthenticator, passportSession] }
