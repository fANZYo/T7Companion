const express = require('express');
const { MongoClient } = require('mongodb');

// Middleware
const boolParser = require('express-query-boolean');
const { logRequest, lowerQuery } = require('./controllers/middleware');

const config = require('./config');

// Routes
const {
	rootRoute,
	commandRoute,
	filterRoute,
} = require('./routes');

const app = express();

app.use(boolParser());
app.use(logRequest);
app.use(lowerQuery);

app.use('/', rootRoute);
app.use('/cmd', commandRoute);
app.use('/filter', filterRoute);

const dbUrl = process.env.MONGODB_URI || config.database.url;
// eslint-disable-next-line consistent-return
MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
	if (err) {
		console.log('Error while connecting to mongo database');
		return 1;
	}

	app.locals.db = client.db(client.s.options.dbName);

	const port = process.env.PORT || 5000;
	app.listen(port, () => {
		console.log(`Server running on port: ${port}`);
	});
});
