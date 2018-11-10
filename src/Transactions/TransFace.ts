import { BillFace } from "~/Bills/BillFace";

export interface TransFace {
	id : string;
	bill: BillFace;
	amount: number;
	date: Date;
	product?: string;
	// product: ProductFace;
}
