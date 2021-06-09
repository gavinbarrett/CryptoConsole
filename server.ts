import * as express from 'express';
import * as WebSocket from 'ws';
import { getCrypto } from './server/getCrypto';
const app = express();
const wss = new WebSocket.Server({ port: 8080 });

// avoid leaking Express server info
app.disable('x-powered-by');
// include files from the dist folder
app.use(express.static('./dist/'));
const desiredTokens = ['Bitcoin', 'Ethereum', 'Litecoin', 'Chainlink', 'Cardano', 'Algorand', 'Filecoin', 'Dash', 'Monero', 'Uniswap', 'Polkadot'];

const filterTokens = tokenName => {
	return desiredTokens.includes(tokenName['name']);
}

wss.on('connection', async (ws:WebSocket, req) => {
	// establish connection
	console.log('Client connected.');
	//console.log(req.client);
	const pulse_data = async () => {
		// download crypto data
		const resp = await getCrypto();
		// filter for desired projects
		const values = resp.body.filter(filterTokens);
		// send data to the client
		ws.send(JSON.stringify(values));
		// recur after 5 seconds
		setTimeout(pulse_data, 5000);
	}
	pulse_data();
	ws.on('error', err => {
		console.log(`An error occurred: ${err}`);
	});
	// close connection
	ws.on('close', () => {
		console.log('Closing websocket connection.');
	});
});

app.listen(5000, () => {
	console.log(`Listening on port 5000.`)
});