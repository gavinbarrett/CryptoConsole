const superagent = require('superagent');

// FIXME: store data in a redis cache; run a process to update every hour
exports.getCrypto = async (req, res) => {
	/* Grab BTC price from CoinGecko API */
	superagent.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
	.set('Accept', 'json')
	.end((err, resp) => {
		// return the cryptocurrency data if it exists and no error occurred; otherwise return null
		(!err && resp && resp.text) 
		? res.send(JSON.stringify({"value": null})) 
		: res.send(JSON.stringify({"value": resp.text}));
	});
}
