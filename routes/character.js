const router = require('express').Router();

// Middleware
const {
	checkCharExists,
	redisKeyGen,
	getCharacterMovelist,
} = require('../controllers/middleware');

// Controllers
const {
	index,
	commandSearch,
	filterMovelist,
} = require('../controllers/character');

router.get('/', index);

router.get('/:charId', checkCharExists, redisKeyGen, getCharacterMovelist, commandSearch);

router.get('/:charId', checkCharExists, redisKeyGen, getCharacterMovelist, filterMovelist);

module.exports = router;
