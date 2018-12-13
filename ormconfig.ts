import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

const ormConfig: ConnectionOptions = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "Dupad12#",
	database: "qTest",
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
