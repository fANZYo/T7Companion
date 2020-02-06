const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const pool = new Pool({
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	user: process.env.PGUSER,
	database: process.env.PGDATABASE,
});

const boolParser = require('express-query-boolean');
const {
	lowerQuery,
} = require('./controllers/middleware');

const {
	rootRoute,
	characterRouter,
} = require('./routes');

const app = express();

// Middleware
app.use(boolParser());
app.use(lowerQuery);

// Routes
app.use('/', rootRoute);
app.use('/characters', characterRouter);

const redisUrl = process.env.REDISCLOUD_URI;
// eslint-disable-next-line consistent-return
pool.connect((err, client) => {
	if (err) {
		console.log('Error while connecting to postgres database:', process.env.PGDATABASE);
		return 1;
	}

	app.locals.pg = client;
	app.locals.redis = redis.createClient(`redis://${redisUrl}`, { no_ready_check: true });

	const port = process.env.PORT || 5000;
	app.listen(port, () => {
		console.log(`Server running on port: ${port}`);
	});
});
