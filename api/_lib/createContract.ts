import { jsPDF } from 'jspdf'

interface IBody {
	org?: string,
	name: string,
	contractId: string
}

export const createContract = ({ org, name, contractId }: IBody): Buffer => {
	console.log('Creating contract...')

	const currentDate = new Date()
	const formattedDate = currentDate.toDateString()

	const stringDoc = `
	  Ownership Contract

  This contract is entered into on ${formattedDate} by and between ${org} (hereinafter referred to as the "Organization") and ${name} (hereinafter referred to as the "Owner").

  1. Object of the Contract
  The Organization agrees to grant ownership rights to the Owner for the specified contract identified by the Contract ID: ${contractId}.

  2. Terms and Conditions
  - The ownership rights include, but are not limited to, usage, transfer, and any other privileges associated with the specified contract.
  - The Owner agrees to comply with all applicable laws and regulations related to the ownership of the specified contract.

  3. Contract ID
  The Contract ID for this ownership agreement is ${contractId}.

  4. Governing Law
  This ownership contract shall be governed by and construed in accordance with the laws of [Jurisdiction].

  IN WITNESS WHEREOF, the parties hereto have executed this ownership contract as of the date first above written.
	`

	const doc = new jsPDF()
	doc.setFontSize(11)
	doc.text(stringDoc, 5, 5, {
		maxWidth: 160
	})

	return Buffer.from(doc.output())
}
