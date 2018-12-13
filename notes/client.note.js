
const getClient = {
	"Clients": [
		...{
			"id": "string",
			"name": "string",
			"state": "number",
		}
	]
}

const addClientRequest = {
	"Clients":
	{
		"name": "string",
	}
}

const addClientResponse = {
	"Clients/id": {
		"id": "string",
		"name": "string",
		"state": 0,
		"bills": null
	}
}

const getClientById = {
	"Clients/id": {
		"id": "string",
		"name": "string",
		"state": "number",
		"bills": [
			...{
				"id": "string",
				"state": "number",
				"beginDate": "Date",
				"endDate": "Date"
			}
		],
	}
}

const updateClientDataByIdRequest = {
	"Clients/id": {
		"id": "string",
		"name": "string",
	}
}

const updateClientDataByIdResponse = {
	"Clients/id": {
		"id": "string",
		"name": "string",
		"state": "number",
		"bills": [ // opcjonslnie
			...{
				"id": "string",
				"state": "number",
				"beginDate": "Date",
				"endDate": "Date"
			}
		],
	}
}

const deleteClientDataByIdRequest = {
	"Clients/id": {
		"id": "string",
	}
}

const deleteClientDataByIdResponse = 204; // No content // tak na prawdę to nie






