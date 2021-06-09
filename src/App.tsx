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

const Page = ({wsocket}) => {
	const [active, updateActive] = React.useState('');
	const [cryptos, updateCryptos] = React.useState([]);

	React.useEffect(() => {
		// set up WebSocket event handlers
		wsConnect();
	}, []);

	const wsConnect = async () => {
		wsocket.current.onopen = () => {
			console.log('Connected to the server!');
		}
		wsocket.current.onmessage = message => {
			// update displayed crypto data
			displayCryptoData(message.data);
		}
		wsocket.current.onerror = err => {
			console.log(`There was an error: ${err}`);
		}
		wsocket.current.onclose = () => {
			console.log('Closing socket connection.');
		}
	}

	const displayCryptoData = async resp => {
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
	// connect to the WebSocket handler
	const wsocket = React.useRef(new WebSocket('wss://cryptoconsole.site/source'));
	// load application
	return <Page wsocket={wsocket}/>;
}

ReactDOM.render(<App/>, document.getElementById('root'));