const rootRoute = require('express').Router();

const characterRouter = require('./character');

rootRoute.route('/')
	.get((req, res) => {
		res.send('T7api running...');
	});

module.exports = {
	rootRoute,
	characterRouter,
};
