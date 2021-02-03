import * as superagent from 'superagent';
import * as redisCache from './cacheInfo';

const url: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;

// FIXME: store data in a redis cache; run a process to update every hour
exports.getCrypto = async (req, res) => {
	// FIXME: check redis cache for data
	/* Grab BTC price from CoinGecko API */
	superagent.get(url).set('Accept', 'json')
	.end((err, resp) => {
		// return the cryptocurrency data if it exists and no error occurred; otherwise return null
		if (err || !resp || !resp.text) 
			res.send(JSON.stringify({"value": null})) 
		else {
			// store crypto info in redis cache
			redisCache.setInCache('info', resp['text']);
			// send crypto info back to the client
			res.send(JSON.stringify({"value": resp['text']}));
		}
	});
}
