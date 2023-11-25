import Irys from "@irys/sdk"
import fs from 'fs'

export const uploadToArweave = async (doc: string) => {
	console.log('Uploading to arweave...')

	const wallet = process.env.ARWEAVE_WALLET 
	if (!wallet) throw 'Missing env variable ARWEAVE_WALLET'

	const key = JSON.parse(wallet)
	console.log({ key, wallet })

	const irys = new Irys({
		url: 'https://node2.irys.xyz',
		token: 'arweave',
		key
	})

	return await irys.uploadFile(doc)
}
