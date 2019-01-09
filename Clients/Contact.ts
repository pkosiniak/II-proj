import { Client } from "./Client";
import { Entity, OneToOne } from 'typeorm';
import { type } from 'os';

@Entity()
export class Contact{
	@OneToOne(type => Client)
	client: Client;
	phone?: number;
	email: string;
}
