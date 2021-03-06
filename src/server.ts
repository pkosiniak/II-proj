import "reflect-metadata";
import { createConnection } from 'typeorm';
import ormConfig from '../ormconfig'

createConnection(
	ormConfig
).then(async connection => {
	const app = require('./app').default;
	app.listen(3000, () => console.log('App started at http://localhost:3000/'));
}).catch(error => console.log(error));

