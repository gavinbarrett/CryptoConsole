import * as express from 'express';
import * as WebSocket from 'ws';
import { getCrypto } from './server/getCrypto';
const app = express();
const port = 5000;

const ws = new WebSocket.Server({ port: 8080 });

// avoid leaking Express server info
app.disable('x-powered-by');
// include files from the dist folder
app.use(express.static('./dist/'));
const desiredTokens = ['Bitcoin', 'Ethereum', 'Litecoin', 'Chainlink', 'Cardano', 'Algorand', 'Filecoin', 'Dash', 'Monero', 'Uniswap', 'Polkadot'];

const filterTokens = tokenName => {
	return desiredTokens.includes(tokenName['name']);
}

ws.on('connection', async (ws:WebSocket, req) => {
	// establish connection
	console.log('Client connected.');
	//console.log(req.client);
	const up = async () => {
		const resp = await getCrypto();
		const values = resp.body.filter(filterTokens);
		ws.send(JSON.stringify(values));
		setTimeout(up, 5000);
	}
	up();
	
	ws.on('message', message => {
		console.log(`Message received.`);
	});
	
	ws.on('error', err => {
		console.log(`An error occurred: ${err}`);
	});
	// close connection
	ws.on('close', () => {
		console.log('Closing websocket connection.');
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
