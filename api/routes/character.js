const router = require('express').Router();

// Middleware
const {
	checkCharExists,
	redisKeyGen,
	readThroughCache,
} = require('../controllers/middleware');

const charListReadThroughCache = readThroughCache('charList');
const summaryReadThroughCache = readThroughCache('summary');
const movelistReadThroughCache = readThroughCache('movelist');

// Controllers
const {
	characterList,
	summary,
	commandSearch,
	filterMovelist,
} = require('../controllers/character');

router.get('/', redisKeyGen, charListReadThroughCache, characterList);

router.use('/:charId', checkCharExists, redisKeyGen);

router.get('/:charId', summaryReadThroughCache, summary);

router.use('/:charId/movelist', movelistReadThroughCache);

router.get('/:charId/movelist', commandSearch);

router.get('/:charId/movelist', filterMovelist);

module.exports = router;
