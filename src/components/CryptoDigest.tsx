import * as React from 'react';
import './sass/CryptoDigest.scss';

type Digest = {
	coin: string,
	price: number,
};

export const CryptoDigest = ({coin, price}: Digest) => {
	return (<div className='cryptodigest'>
		{`${coin} is currently at ${price}.`}
	</div>);
}
