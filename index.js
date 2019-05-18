const express = require('express');
const { MongoClient } = require('mongodb');
const redis = require('redis');

// Middleware
const boolParser = require('express-query-boolean');
const {
	logRequest,
	lowerQuery,
} = require('./controllers/middleware');

const config = require('./config');

// Routes
const {
	rootRoute,
	characterRouter,
} = require('./routes');

const app = express();

app.use(boolParser());
app.use(logRequest);
app.use(lowerQuery);

app.use('/', rootRoute);
app.use('/character', characterRouter);

const dbUrl = process.env.MONGODB_URI || config.database.url;
const redisUrl = process.env.REDISCLOUD_URL || config.redis.url;
// eslint-disable-next-line consistent-return
MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
	if (err) {
		console.log('Error while connecting to mongo database');
		return 1;
	}

	app.locals.db = client.db(client.s.options.dbName);
	app.locals.redis = redis.createClient(redisUrl, { no_ready_check: true });

	const port = process.env.PORT || 5000;
	app.listen(port, () => {
		console.log(`Server running on port: ${port}`);
	});
});
