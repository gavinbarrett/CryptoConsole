import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { CryptoDigest } from './components/CryptoDigest';
import './components/sass/App.scss';

const App = () => {
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
		/* Keys for the response['value'] object:
		id,symbol,name,image,current_price,market_cap,market_cap_rank,fully_diluted_valuation,total_volume,high_24h,low_24h,price_change_24h,price_change_percentage_24h,market_cap_change_24h,market_cap_change_percentage_24h,circulating_supply,total_supply,max_supply,ath,ath_change_percentage,ath_date,atl,atl_change_percentage,atl_date,roi,last_updated
		*/
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

	return (<div>
	<Header/>
	{cryptos ? cryptos.map((security, index) => {
		let { name: coin, current_price: price, market_cap_rank: market_rank, price_change_24h: change, price_change_percentage_24h: change_percent, circulating_supply: circulating, total_supply: total, low_24h: low, high_24h: high } = security;
		return <CryptoDigest key={index} coin={coin} price={price} market_rank={market_rank} change={change} change_percent={change_percent} circulating={circulating} total={total} low={low} high={high}/>
	}) : 'Loading cryptos...'}
	</div>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
