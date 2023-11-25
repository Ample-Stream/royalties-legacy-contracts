import { VercelRequest, VercelResponse } from '@vercel/node'
import { createContract } from './_lib/createContract';
import { uploadToArweave } from './_lib/uplaodToArweave';

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method != 'POST') return res.status(500).send('');

	try {

		// create the document 
		const doc: Buffer = createContract(req.body)

		// upload to arweave
		const uploadResponse = await uploadToArweave(doc)
		console.log({ uploadResponse })

		res.status(201).json({
			success: true,
			data: {
				...uploadResponse.data,
				url: `https://gateway.irys.xyz/${uploadResponse.data.id}`
			}
		})

	} catch (error) {

		console.error(error)
		return res.status(500).json({
			success: false,
			message: error
		})

	}
}

const allowCors = (fn) => async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
	res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}

	return await fn(req, res);
}

export default allowCors(handler)
