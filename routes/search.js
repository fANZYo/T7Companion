const search = require('express').Router();

// Controllers
const searchGet = require('../controllers/search');

search.route('/search')
	.get(searchGet);

module.exports = search;
