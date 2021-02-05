import * as React from 'react';
import './sass/Footer.scss';

export const Footer = () => {
	const srcLink = 'https://github.com/gavinbarrett/CryptoConsole';
	const geckoLink = 'https://www.coingecko.com/en/api';
	// smoothly scroll to the top of the page
	return (<footer>
		<div className='footer-box'>
			<div className='footer-item'><a className='footer-link' href={srcLink}>Source Code</a></div>
			<div className='footer-item'><a className='footer-link' href={geckoLink}>Powered by CoinGecko</a></div>
			<div className='footer-item' onClick={() => window.scroll({top: 0, left: 0, behavior: 'smooth'})}>CryptoConsole &copy; 2021</div>
		</div>
	</footer>);
}
