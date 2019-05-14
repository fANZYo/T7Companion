const express = require('express');
const { MongoClient } = require('mongodb');

const config = require('./config');

// Routes
const searchRoute = require('./routes/search');

const app = express();

app.use((req, res, next) => {
	console.log(`${req.method} ${req.originalUrl}`);
	next();
});

app.use('/api', searchRoute);

app.get('/', (req, res) => {
	res.send('T7api running...');
});

// eslint-disable-next-line consistent-return
MongoClient.connect(config.database.url, { useNewUrlParser: true }, (err, client) => {
	if (err) {
		console.log('Error while connecting to mongo database');
		return 1;
	}

	app.locals.db = client.db('t7api');

	const port = process.env.PORT || 5000;
	app.listen(port, () => {
		console.log(`Server running on port: ${port}`);
	});
});
