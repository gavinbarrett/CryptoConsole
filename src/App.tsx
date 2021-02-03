import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components/Header';
import './components/sass/App.scss';

const App = () => {

	const [cryptos, updateCryptos] = React.useState([]);
	const tokens = ['Bitcoin', 'Ethereum', 'Litecoin', 'Chainlink', 'Cardano', 'Algorand', 'Filecoin', 'Dash', 'Dai', 'Monero', 'Stellar', 'Tether', 'Uniswap', 'Polkadot'];

	React.useEffect(() => {
		getCrypto();
	}, []);

	const filterTokens = tokenName => {
		return tokens.includes(tokenName['name']);
	}

	const printInfo = async resp => {
		// FIXME: filter out Bitcoin, Ethereum, LiteCoin, Algorand, FileCoin, Dash, Zcash, DAI, Monero, Uniswap, Chainlink, Cardano, Tether, Stellar, Polkadot
		const values = JSON.parse(resp['value']);
		const filtered = values.filter(filterTokens);
		console.log(filtered);
		await updateCryptos(filtered);
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
	{cryptos ? cryptos.map(c => (<p>{c['name']} is at {c['current_price']}</p>)): ''}
	</div>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
