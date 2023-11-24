import Irys from "@irys/sdk"
import fs from 'fs'

export const uploadToArweave = async (doc: string) => {
	const key = JSON.parse(fs.readFileSync('wallet.json').toString())

	const irys = new Irys({
		url: 'https://node2.irys.xyz',
		token: 'arweave',
		key
	})

	return await irys.upload(doc)
}
