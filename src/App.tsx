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
	const [wsocket, updateWSocket] = React.useState(new WebSocket('ws://192.168.1.98:8080/'));

	React.useEffect(() => {
		console.log('Refreshing page again.');
		wsConnect();
		return () => {
			wsocket.close();
		}
	}, []);

	const wsConnect = async () => {
		console.log('Running wsConnect function.');
		wsocket.onopen = () => {
			console.log('Connected to the server!');
		}
		wsocket.onmessage = message => {
			displayCryptoData(message.data);
			wsocket.send("Thanks for the info.");
		}
		wsocket.onerror = err => {
			console.log(`There was an error: ${err}`);
		}
		wsocket.onclose = () => {
			console.log('Closing socket connection.');
		}
	}

	const displayCryptoData = async resp => {
		// FIXME: filter out Bitcoin, Ethereum, LiteCoin, Algorand, FileCoin, Dash, Zcash, DAI, Monero, Uniswap, Chainlink, Cardano, Tether, Stellar, Polkadot
		console.log('Updating crypto data.');
		const values = JSON.parse(resp);
		if (!values)
			return;
		// filter out the coins we care about
		//const filtered = values.filter(filterTokens);
		// update array of displayed cryptocurrencies
		updateCryptos(values);
	}

	return (<>
		<Header/>
			{cryptos.length ? <DigestArray cryptos={cryptos} active={active} updateActive={updateActive}/> : <Loading/>}
		<Footer/>
	</>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
