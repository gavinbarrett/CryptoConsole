import * as superagent from 'superagent';
import * as redisCache from './cacheInfo';

const url: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;
const key: string = `info`;

exports.getCrypto = async (req, res) => {
	/* Send crypto market data to the client */
	// check the redis Cache for data
	const info = await redisCache.checkInCache(key);
	// if it exists, restore data; otherwise, download it
	if (info) {
		// pull info from cache
		const data = await redisCache.getFromCache(key);
		// send data to the client
		res.send(JSON.stringify({"value": data}));
	} else {
		/* Download crypto market data from the CoinGecko API */
		superagent.get(url).set('Accept', 'json')
		.end(async (err, resp) => {
			// return the cryptocurrency data if it exists and no error occurred; otherwise return null
			if (err || !resp || !resp.text) 
				res.send(JSON.stringify({"value": null})) 
			else {
				// store crypto info in redis cache
				const r = await redisCache.setInCache('info', resp['text']);
				// send crypto info back to the client
				res.send(JSON.stringify({"value": resp['text']}));
			}
		});
	}
}
