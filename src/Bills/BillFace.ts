import { ClientFace } from '~/Clients/ClientFace';

export interface BillFace {
	id: string;
	beginDate: Date;
	endDate?: Date;
	client?: ClientFace;
	state: number;
	tarnsactions?: [];
}
