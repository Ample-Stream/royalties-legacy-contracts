const CONTRACT_CREATION_SERVICE_URL = 'https://royalties-legacy-contracts.vercel.app/api/contract'

// set the initial state for the form
State.init({
	// general
	loading: false,

	// form
	org: '',
	name: '',
	contractId: '',

	// post response
	url: '',
	error: '',
})

const setOrg = (e) => State.update({ org: e.target.value })
const setName = (e) => State.update({ name: e.target.value })
const setContractId = (e) => State.update({ contractId: e.target.value })

const createContract = () => {
	State.update({ loading: true })
	asyncFetch(CONTRACT_CREATION_SERVICE_URL, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			org: State.get().org,
			name: State.get().name,
			contractId: State.get().contractId
		})
	}).then(res => {
		if (res.ok && res.body.success) {
			State.update({ url: res.body.data.url })
		} else if (!res.body.success) {
			State.update({ error: res.body.message })
		} else {
			State.update({ error: res.error.toString() })
		}

		State.update({ loading: false })
	})
}

return <>
	<h1>Contract creation system</h1>
	<h2>By Ample Stream</h2>
	<hr />

	<label>
		Organization
		<input type="text" required onChange={setOrg} />
	</label>
	<label>
		Name
		<input type="text" required onChange={setName} />
	</label>
	<label>
		Contract ID
		<input type="text" required onChange={setContractId} />
	</label>

	{state.loading
		? <p>Loading...</p>
		: <button onClick={createContract}>Create contract</button>
	}
	{state.url && <a href={state.url} target="_blank">Go to new contract</a>}
	{state.error && <p>Error: {state.error}</p>}
</>
