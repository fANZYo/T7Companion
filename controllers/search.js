const config = require('../config');

const searchGet = async (req, res) => {
	const temp = await req.app.locals.db
		.collection(config.database.collection)
		.find(
			{ name: req.query.c },
		);
	res.json(await temp.toArray());
};

module.exports = searchGet;
