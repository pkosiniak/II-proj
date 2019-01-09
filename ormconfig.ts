import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { username, password, dbName } from '~/security/Secret.Security';

const ormConfig: ConnectionOptions = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: username,
	password: password,
	database: dbName,
	synchronize: true,
	logging: false,
	entities: [
		"./src/Bills/Bill.ts",
		"./src/Clients/Client.ts",
		"./src/Transactions/Transaction.ts",
		// "./src/**/*.entity.ts"
	],
	migrations: [
		"migrations/**/*.ts"
	],
	subscribers: [
		"subscriber/**/*.ts"
	]
}

export default ormConfig;
