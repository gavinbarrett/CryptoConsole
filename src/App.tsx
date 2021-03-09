import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { CryptoDigest } from './components/CryptoDigest';
import { Loading } from './components/Loading';
import { Footer } from './components/Footer';
import './components/sass/App.scss';

const DigestArray = ({cryptos, active, updateActive}) => {
	return(<>
	{cryptos ? cryptos.map((security, index) => {
		let { name: coin, current_price: price, market_cap_rank: market_rank, price_change_24h: change, price_change_percentage_24h: change_percent, circulating_supply: circulating, total_supply: total, low_24h: low, high_24h: high } = security;
		return <CryptoDigest key={index} active={active} updateActive={updateActive} coin={coin} price={price} market_rank={market_rank} change={change} change_percent={change_percent} circulating={circulating} total={total} low={low} high={high}/>
	}) : 'Loading cryptos...'}
	</>);
}

const App = () => {
	const [active, updateActive] = React.useState('');
	const [cryptos, updateCryptos] = React.useState([]);
	const desiredTokens = ['Bitcoin', 'Ethereum', 'Litecoin', 'Chainlink', 'Cardano', 'Algorand', 'Filecoin', 'Dash', 'Monero', 'Uniswap', 'Polkadot'];

	React.useEffect(() => {
		// download cryptosecurity data from the server cache
		getCrypto();
	}, []);

	const filterTokens = tokenName => {
		// filter out any tokens that aren't in the token array
		return desiredTokens.includes(tokenName['name']);
	}

	const displayCryptoData = async resp => {
		// FIXME: filter out Bitcoin, Ethereum, LiteCoin, Algorand, FileCoin, Dash, Zcash, DAI, Monero, Uniswap, Chainlink, Cardano, Tether, Stellar, Polkadot
		const values = JSON.parse(resp['value']);
		if (!values)
			return;
		// filter out the coins we care about
		const filtered = values.filter(filterTokens);
		// update array of displayed cryptocurrencies
		await updateCryptos(filtered);
	}
	
	const getCrypto = async () => {
		// Download the cached Bitcoin price data
		const resp = await fetch('/getcrypto', {method: 'POST', headers: {'Content-Type': 'application/json'}});
		// parse the json
		const json = await resp.json();
		displayCryptoData(json);
	}

	return (<>
		<Header/>
			{cryptos.length ? <DigestArray cryptos={cryptos} active={active} updateActive={updateActive}/> : <Loading/>}
		<Footer/>
	</>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
