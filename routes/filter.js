const filter = require('express').Router();

// Controllers
const filterMoves = require('../controllers/filter');

filter.route('/')
	.get(filterMoves);

module.exports = filter;
