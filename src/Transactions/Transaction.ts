import { Bill } from '../Bills/Bill';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {

	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(type => Bill, bill => bill.transactions)
	bill: Bill;

	@Column()
	amount: number;

	@Column()
	date: Date;

	// product?: string;
	// product: Product;

}

// export default new Transaction()id
