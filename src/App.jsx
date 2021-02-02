import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	
	useEffect(() => {
		getCrypto();
	}, []);


	const getCrypto = async () => {
		const resp = await fetch('/getcrypto', {method: 'POST', headers: {'Content-Type': 'application/json'}});
		const r = await resp.json();
		console.log(`BTC: ${Object.getOwnPropertyNames(JSON.parse(r['status']['text'])['data']['BTC'])}`);
		console.log(`ETH: ${Object.getOwnPropertyNames(JSON.parse(r['status']['text'])['data']['ETH'])}`);
	}

	return (<div>{"This is an app, bitch!"}</div>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
