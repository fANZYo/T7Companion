const config = require('../config');

const middleware = {
	logRequest: (req, res, next) => {
		console.log(`${req.method} ${req.originalUrl}`); // eslint-disable-line no-console
		next();
	},
	lowerQuery: (req, res, next) => {
		req.query = Object.entries(req.query)
			.map(([k, v]) => [k.toLowerCase(), v])
			.reduce((obj, [k, v]) => {
				const temp = {};
				temp[k] = v;
				return Object.assign(obj, temp);
			}, {});

		next();
	},
	redisKeyGen: (req, res, next) => {
		req.redisKey = `movelist:${req.params.charId}`;

		next();
	},
	getCharacterMovelist: (req, res, next) => {
		req.app.locals.redis.get(req.redisKey, async (err, reply) => {
			const { movelist } = reply ? { movelist: JSON.parse(reply) } : await req.app.locals.db
				.collection(config.database.collection)
				.findOne(
					{ name: config.characters.find(c => c === req.params.charId.toLowerCase()) },
				);

			if (!reply) {
				req.app.locals.redis.set(req.redisKey, JSON.stringify(movelist));
			}

			req.movelist = movelist;

			next();
		});
	},
};

module.exports = middleware;
