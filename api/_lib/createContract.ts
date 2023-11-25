import { jsPDF } from 'jspdf'

interface IBody {
	org?: string,
	name: string,
	contractId: string
}

export const createContract = ({ org, name, contractId }: IBody) => {
	const docName = './document.pdf'
	console.log('Creating contract...')
	const currentDate = new Date()
	const formattedDate = currentDate.toDateString()

	const htmlDoc = `
	  <h2>Ownership Contract</h2>

	  <p>This contract is entered into on ${formattedDate} by and between ${org} (hereinafter referred to as the "Organization") and ${name} (hereinafter referred to as the "Owner").</p>

	  <h3>1. Object of the Contract</h3>
	  <p>The Organization agrees to grant ownership rights to the Owner for the specified contract identified by the Contract ID: ${contractId}.</p>

	  <h3>2. Terms and Conditions</h3>
	  <ul>
		<li>The ownership rights include, but are not limited to, usage, transfer, and any other privileges associated with the specified contract.</li>
		<li>The Owner agrees to comply with all applicable laws and regulations related to the ownership of the specified contract.</li>
	  </ul>

	  <h3>3. Contract ID</h3>
	  <p>The Contract ID for this ownership agreement is ${contractId}.</p>

	  <h3>4. Governing Law</h3>
	  <p>This ownership contract shall be governed by and construed in accordance with the laws of [Jurisdiction].</p>

	  <p><em>IN WITNESS WHEREOF, the parties hereto have executed this ownership contract as of the date first above written.</em></p>
	`

	const doc = new jsPDF()

	doc.html(htmlDoc, { margin: 2 })
	doc.save(docName)

	return docName
}
