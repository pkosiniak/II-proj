const getAllBils = {
	"Bills": [
		...{
			"id": "string",
			"beginDate": "Date",
			"endDate": "Date",
			"state": "number",
			"client": {
				"id": "string",
				"name": "string"
			}
		}
	]
}


const addBillRequest = {
	"Bills": {
		"beginDate": "Date",
		"client": {
			"id": "string",
		}
	}
}

const addBillResponse = {
	"Bills/id": {
		"id": "string",
		"beginDate": "Date",
		"endDate": null,
		"state": 0,
		"client": {
			"id": "string",
			"name": "string"
		},
		"tarnsactions": null
	}
}

const getBillById = {
	"Bills/id": {
		"id": "string",
		"beginDate": "Date",
		"endDate": "Date",
		"state": "number",
		"client": {
			"id": "string",
			"name": "string"
		},
		"tarnsactions": [
			...{
				"id": "string",
				"amount": "number",
				"date": "Date",
			}
		]
	}
}

const closeBillByIdRequest = {
	"Bills/id": {
		"id": "string",
		"endDate": "Date",
		"state": "number",
		"client": {
			"id": "string",
		},
		"tarnsaction": [
			{
				"id": "string",
				"amount": "number",
				"date": "Date",
			}
		]
	}
}

const closeBillByIdResponse = { // o ile nie 20X
	"Bills/id": {
		"id": "string",
		"beginDate": "Date",
		"endDate": "Date",
		"state": "number",
		"client": {
			"id": "string",
		}
	}
}

// ???
const RedrawCloseBillByIdRequest = {
	"Bills/id": {
		"id": "string",
		"endDate": "Date",
		"client": {
			"id": "string",
		},
		"tarnsactions":
		{
			"id": "string",
		}
	}
}

// Nowy rachunek, z nowym id, gdzie zostają przepisane wszystkie dane z wycofywanego rachunku,
// bez ostatniej transakcji i bez daty zakończenia.
const RedrawCloseBillByIdtResponse = new Bill();
