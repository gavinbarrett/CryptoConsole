import * as React from 'react';
import './sass/CryptoDigest.scss';

type Digest = {
	coin: string,
	active: string,
	updateActive: (string) => string,
	price: number,
	market_rank: number,
	change: number,
	change_percent: number,
	circulating: number,
	total: number,
	low: number,
	high: number,
};

export const CryptoDigest = ({coin, active, updateActive, price, market_rank, change, change_percent, circulating, total, low, high}: Digest) => {
	const [act, updateAct] = React.useState('');
	const [expanded, updateExpanded] = React.useState('');

	const displayFullDigest = () => {
		if (act) {
			updateAct('')
			updateExpanded('');
		} else {
			updateAct('active-digest');
			updateExpanded('extra-active');
		}
	}

	return (<div className={`crypto-digest ${act}`} onClick={displayFullDigest}>
		<div className="crypto-expand">
			<img className="crypto-logo" src={`./assets/${coin}.png`}/>
			<div className="crypto-info">
				<div className="coin-name">
					{coin}
				</div>
				<div className="coin-price" title="Coin Price">
					{`$${price.toFixed(3)}`}
				</div>
			</div>
			<div className="market-flux" title="Market Flux">
				{(Math.sign(change) > 0) ? <div className="arrow arrow-up">{"\u27A4"}</div> : <div className="arrow arrow-down">{"\u27A4"}</div>}
				{`${change_percent.toFixed(3)}% (${change.toFixed(2)})`}
			</div>
			<div className="low-24" title="Daily Minima">
				{`$${low.toFixed(3)}`}
			</div>
			<div className="high-24" title="Daily Maxima">
				{`$${high.toFixed(3)}`}
			</div>
		</div>
		<div className={`extra-info ${expanded}`}>
			<div className="market-rank" title='Market Cap. Rank'>
				{`Market Cap Rank: #${market_rank}`}
			</div>
			<div className="percent-mined" title='Percent Mined'>
				{total ? `Total circulating supply: ${(circulating/total).toFixed(3)}%` : 'Total circulating supply: N/A'}
			</div>
		</div>
	</div>);
}
