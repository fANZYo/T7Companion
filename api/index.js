const express = require('express');
const { MongoClient } = require('mongodb');
const redis = require('redis');

const boolParser = require('express-query-boolean');
const {
	logRequest,
	lowerQuery,
} = require('./controllers/middleware');

const {
	rootRoute,
	characterRouter,
} = require('./routes');

const app = express();

// Middleware
app.use(boolParser());
app.use(logRequest);
app.use(lowerQuery);

// Routes
app.use('/', rootRoute);
app.use('/character', characterRouter);

const dbUrl = process.env.MONGODB_URI;
const redisUrl = process.env.REDISCLOUD_URI;
// eslint-disable-next-line consistent-return
MongoClient.connect(`mongodb://${dbUrl}/t7api`, { useNewUrlParser: true }, (err, client) => {
	if (err) {
		console.log('Error while connecting to mongo database:', dbUrl);
		return 1;
	}

	app.locals.db = client.db(client.s.options.dbName);
	app.locals.redis = redis.createClient(`redis://${redisUrl}`, { no_ready_check: true });

	const port = process.env.PORT || 5000;
	app.listen(port, () => {
		console.log(`Server running on port: ${port}`);
	});
});
