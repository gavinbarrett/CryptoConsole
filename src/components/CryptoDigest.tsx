import * as React from 'react';
import './sass/CryptoDigest.scss';

type Digest = {
	coin: string,
	price: number,
};

const BasicInfo = ({coin, price}) => {
	return (<div className='crypto-info'>
		<div className='coin-name'>
			{coin}
		</div>
		<div className='coin-price'>
			{`$${price.toString()}`}
		</div>
	</div>);
}

export const CryptoDigest = ({coin, price}: Digest) => {
	return (<div className='crypto-digest'>
		<BasicInfo coin={coin} price={price}/>
	</div>);
}
