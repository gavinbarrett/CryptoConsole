import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header';
import './components/sass/App.scss';

const App = () => {
	
	useEffect(() => {
		getCrypto();
	}, []);

	const printInfo = async resp => {
		console.log(resp);
		if (!resp.value) {
			console.log('Error');
			return;
		}
		//const price = JSON.parse(resp.value);
		//console.log(price['bitcoin']['usd']);
	}
	
	const getCrypto = async () => {
		// Download the cached Bitcoin price data
		const resp = await fetch('/getcrypto', {method: 'POST', headers: {'Content-Type': 'application/json'}});
		// parse the json
		const json = await resp.json();
		printInfo(json);
	}

	return (<div>
	<Header/>
	{"This is an app, bitch!"}</div>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
