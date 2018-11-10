import { ClientFace } from "./ClientFace";

export interface ContactFace{
	client: ClientFace;
	phone?: number;
	email: string;
}
