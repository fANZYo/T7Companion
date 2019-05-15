const FuzzySearch = require('fuzzy-search');
const config = require('../config');

const searchMove = async (req, res) => {
	const { movelist } = await req.app.locals.db
		.collection(config.database.collection)
		.findOne(
			{ name: config.characters.find(c => c === req.query.c.toLowerCase()) },
		);

	// TODO: cache movelist

	const searcher = new FuzzySearch(movelist, ['cmd'], { sort: true });

	const matchedMovelist = searcher.search(req.query.cmd);

	res.json(matchedMovelist);
};

module.exports = searchMove;
