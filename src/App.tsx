import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { CryptoDigest } from './components/CryptoDigest';
import { Loading } from './components/Loading';
import { Footer } from './components/Footer';
import './components/sass/App.scss';

const WSContext = React.createContext(new WebSocket('wss://cryptoconsole.site/source'));

const DigestArray = ({cryptos, active, updateActive}) => {
	return(<>
	{cryptos ? cryptos.map((security, index) => {
		let { name: coin, current_price: price, market_cap_rank: market_rank, price_change_24h: change, price_change_percentage_24h: change_percent, circulating_supply: circulating, total_supply: total, low_24h: low, high_24h: high } = security;
		return <CryptoDigest key={index} active={active} updateActive={updateActive} coin={coin} price={price} market_rank={market_rank} change={change} change_percent={change_percent} circulating={circulating} total={total} low={low} high={high}/>
	}) : 'Loading cryptos...'}
	</>);
}

const Page = () => {
	const [active, updateActive] = React.useState('');
	const [cryptos, updateCryptos] = React.useState([]);
	const wsocket = React.useContext(WSContext);

	React.useEffect(() => {
		// set up WebSocket event handlers
		wsConnect();
	}, []);
	const wsConnect = async () => {
		wsocket.onopen = () => {
			console.log('Connected to the server!');
		}
		wsocket.onmessage = message => {
			// update displayed crypto data
			displayCryptoData(message.data);
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
		// update array of displayed cryptocurrencies
		updateCryptos(values);
	}

	return (<>
		<Header/>
			{cryptos.length ? <DigestArray cryptos={cryptos} active={active} updateActive={updateActive}/> : <Loading/>}
		<Footer/>
	</>);
}

const App = () => {
	const [wsocket, updateWSocket] = React.useState(new WebSocket('wss://cryptoconsole.site/source'));
	return (<WSContext.Provider value={wsocket}>
		<Page/>
	</WSContext.Provider>);
}

ReactDOM.render(<App/>, document.getElementById('root'));