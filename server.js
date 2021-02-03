const express = require('express');
const superagent = require('superagent');
const { getCrypto } = require('./server/getCrypto.js');
const app = express();
const port = 5000;
// include files from the dist folder
app.use(express.static('./dist/'));

// grab crypto market information
app.post('/getcrypto', getCrypto);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
