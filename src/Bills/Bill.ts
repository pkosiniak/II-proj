import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Transaction } from '../Transactions/Transaction';
import { Client } from '../Clients/Client'

@Entity()
export class Bill {

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ default: new Date(Date.now()), readonly: true })
	beginDate: Date;

	@Column({ nullable: true })
	endDate?: Date;

	@Column({ default: false })
	isClosed: boolean;

	@ManyToOne(type => Client, client => client.bills, { nullable: true })
	client?: Client;

	@Column({ default: 0 })
	state: number;

	@OneToMany(type => Transaction, transaction => transaction.bill, { nullable: true })
	transactions?: Transaction[];
}

// export default new Bill();b
