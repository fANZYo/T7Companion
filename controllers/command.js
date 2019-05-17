const FuzzySearch = require('fuzzy-search');
const config = require('../config');

const searchMove = (req, res) => {
	const character = config.characters.find(c => c === req.query.c.toLowerCase());
	if (character) {
		req.app.locals.redis.get(req.redisKey, async (err, reply) => {
			const { movelist } = reply ? { movelist: JSON.parse(reply) } : await req.app.locals.db
				.collection(config.database.collection)
				.findOne(
					{ name: character },
				);

			if (!reply) {
				req.app.locals.redis.set(req.redisKey, JSON.stringify(movelist));
			}

			const searcher = new FuzzySearch(movelist, ['cmd'], { sort: true });

			const matchedMovelist = searcher.search(req.query.cmd);

			res.json(matchedMovelist);
		});
	} else {
		res.json({ error: `Cannot find character ${req.query.c}` });
	}
};

module.exports = searchMove;
