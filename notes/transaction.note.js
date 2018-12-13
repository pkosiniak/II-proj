

const getAllTransactions = {
	"Tarnsactions": [
		...{
			"id": "string",
			"amount": "number",
			"date": "Date",
			"bill": {
				"id": "string",
				"client": {
					"id": "string",
					"name": "string"
				}
			}
		}
	]
}


const getTransactionById = {
	"Tarnsactions/id": {
		"id": "string",
		"amount": "number",
		"date": "Date",
		"bill": {
			"id": "string",
			"client": {
				"id": "string",
				"name": "string"
			}
		}
	}
}

const addNewTransactionByIdRequest = {
	"Tarnsactions/id": {
		"id": "string",
		"amount": "number",
		"date": "Date",
		"bill": {
			"id": "string",
		}
	}
}

const addNewTransactionByIdResponse = getTransactionsById; // albo jakieś 201, albo nawet bill/id

const addAllTransactionsByIdRequest = [
	...{
		"Tarnsactions/id": {
			"id": "string",
			"amount": "number",
			"date": "Date",
			"bill": {
				"id": "string",
			}
		}
	}
]

const addAllTransactionsByIdRequest = getBillById;

const redrawTransactionByIdRequest = {
	"Tarnsactions/id": {
		"id": "string",
		"bill": {
			"id": "string",
		}
	}
}

const redrawTransactionByIdResponse = 204;
