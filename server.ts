const express = require('express');
const { getCrypto } = require('./server/getCrypto.ts');
const app = express();
const port = 5000;

// disable leaking that we're using Express
app.disable('x-powered-by');
// include files from the dist folder
app.use(express.static('./dist/'));

// grab crypto market information
app.post('/getcrypto', getCrypto);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
