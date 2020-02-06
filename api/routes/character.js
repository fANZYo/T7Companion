const router = require('express').Router();

// Middleware
const {
	checkCharExists,
	redisKeyGen,
	getCharacterMovelist,
} = require('../controllers/middleware');

// Controllers
const {
	characterList,
	commandSearch,
	filterMovelist,
	commonMoves,
} = require('../controllers/character');

router.get('/', characterList);

router.use('/:charId', checkCharExists, redisKeyGen, getCharacterMovelist);

router.get('/:charId', commandSearch);

router.get('/:charId', filterMovelist);

router.get('/:charId/commons', commonMoves);

module.exports = router;
