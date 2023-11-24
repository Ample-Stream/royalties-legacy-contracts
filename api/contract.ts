import { VercelRequest, VercelResponse } from '@vercel/node'
import { createContract } from './_lib/createContract';
import { uploadToArweave } from './_lib/uplaodToArweave';

export default async (req: VercelRequest, res: VercelResponse) => {
	if (req.method != 'POST') return res.status(500).send('');

	try {

		// create the document
		const ownershipDocument = createContract(req.body)

		// upload to arweave
		const uploadResponse = await uploadToArweave(ownershipDocument)

		res.status(201).json({
			success: true,
			data: uploadResponse
		})

	} catch (error) {
		console.error(error)
		return res.status(500).json({
			success: false,
			message: JSON.stringify(error)
		})
	}
}
