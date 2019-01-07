import { Bill } from '../Bills/Bill';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';

@Entity()
export class Client {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: true})
	@Index()
	oAuthId: string;

	@Column()
	name: string;

	@Column({ default: 0 })
	state: number;

	@OneToMany(type => Bill, bill => bill.client, { nullable: true })
	bills?: Bill[];



	// contact?: Contact;

}

// export default new Client()client
