const rootRoute = require('express').Router();

const commandRoute = require('./command');
const filterRoute = require('./filter');

rootRoute.route('/')
	.get((req, res) => {
		res.send('T7api running...');
	});

module.exports = {
	rootRoute,
	commandRoute,
	filterRoute,
};
