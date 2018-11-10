import { ContactFace } from './ContactFace';


export interface ClientFace {
	id: string;
	name: string;
	state: number;
	bills: [];
	contact?: ContactFace;
}
