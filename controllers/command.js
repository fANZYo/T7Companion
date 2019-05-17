const FuzzySearch = require('fuzzy-search');
const config = require('../config');

const searchMove = (req, res) => {
	req.app.locals.redis.get(req.redisKey, async (err, reply) => {
		const { movelist } = reply ? { movelist: JSON.parse(reply) } : await req.app.locals.db
			.collection(config.database.collection)
			.findOne(
				{ name: config.characters.find(c => c === req.query.c.toLowerCase()) },
			);

		if (!reply) {
			req.app.locals.redis.set(req.redisKey, JSON.stringify(movelist));
		}

		const searcher = new FuzzySearch(movelist, ['cmd'], { sort: true });

		const matchedMovelist = searcher.search(req.query.cmd);

		res.json(matchedMovelist);
	});
};

module.exports = searchMove;
