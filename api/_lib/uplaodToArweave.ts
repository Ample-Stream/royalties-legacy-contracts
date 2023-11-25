import Irys from "@irys/sdk"

export const uploadToArweave = async (doc: Buffer) => {
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
	const uploader = irys.uploader.chunkedUploader

	return await uploader.uploadData(doc, {
		tags: [
			{
				name: "Content-Type",
				value: "application/pdf"
			}
		]
	});
}
