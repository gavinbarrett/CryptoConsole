import * as React from 'react';
import './sass/CryptoDigest.scss';

type Digest = {
	coin: string,
	price: number,
	market_rank: number,
	change: number,
	change_percent: number,
	circulating: number,
	total: number,
	low: number,
	high: number,
};

export const CryptoDigest = ({coin, price, market_rank, change, change_percent, circulating, total, low, high}: Digest) => {
	return (<div className='crypto-digest'>
		<img className='crypto-logo' src={`./assets/${coin}.png`}/>
		<div className='crypto-info'>
			<div className='coin-name'>
				{coin}
			</div>
			<div className='coin-price' title='Coin Price'>
				{`$${price.toFixed(3)}`}
			</div>
		</div>
		<div className='market-flux' title='Market Flux'>
			{(Math.sign(change) > 0) ? <div className='arrow arrow-up'/> : <div className='arrow arrow-down'/>}
			{`${change_percent.toFixed(3)}% (${change.toFixed(2)})`}
		</div>
		<div className='market-rank' title='Market Cap. Rank'>
			{`#${market_rank}`}
		</div>
		<div className='percent-mined' title='Percent Mined'>
			{total ? `${(circulating/total).toFixed(3)}%` : 'N/A'}
		</div>
		<div className='low-24' title='Daily Minima'>
			{`$${low.toFixed(3)}`}
		</div>
		<div className='high-24' title='Daily Maxima'>
			{`$${high.toFixed(3)}`}
		</div>
	</div>);
}
