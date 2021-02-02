const express = require('express');
const superagent = require('superagent');
const app = express();
const port = 5555;
require('dotenv').config();

app.use(express.static('./dist/'));

const getCrypto = async (req, res) => {
	superagent
	.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest')
	.query('symbol=BTC,ETH')
	.set('X-CMC_PRO_API_KEY', process.env.API_KEY)
	.set('Accept', 'json')
	.end((err, resp) => {
		if (err) {
			console.log(`Error: ${err}.`);
			res.send(JSON.stringify({"status": "error"}));
		} else {
			console.log(`Res: ${resp}.`);
			res.send(JSON.stringify({"status": resp}));
		}
	});
}

app.post('/getcrypto', getCrypto);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
