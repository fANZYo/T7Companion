const router = require('express').Router();

// Middleware
const {
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

router.get('/:charId', redisKeyGen, getCharacterMovelist, commandSearch);

router.get('/:charId', redisKeyGen, getCharacterMovelist, filterMovelist);

module.exports = router;
