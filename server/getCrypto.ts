import * as superagent from 'superagent';
const url: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;

export const getCrypto = async () => {
	return superagent.get(url);
}