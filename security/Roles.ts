import { Request } from "express";
import { getRepository } from 'typeorm';
import { Client } from '../Clients/Client';
import { clientRole, adminRole } from './Secret.Security';

const ConnectRoles = require('connect-roles');
const roles = new ConnectRoles({ async: true });

roles.use(clientRole, async (req: Request & { user?: any }) => {
	const client = await getRepository(Client).findOne(req.params.userId)
	return client && req.user && client.oAuthId === req.user.id ? true : undefined;
});

roles.use((req: Request & { user?: any }) => {
	return req.user && req.user.role && req.user.role === adminRole ? true : false;
});

export default roles;
