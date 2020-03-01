const config = require('../config');
const {
	charListQuery,
	summaryQuery,
	movelistQuery,
} = require('../queries');

const middleware = {
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
	checkCharExists: (req, res, next) => {
		const charId = config.characters.find(c => c === req.params.charId.toLowerCase());

		if (!charId) {
			res.json({
				error: `Could not find character: ${req.params.charId}`,
			});
		} else {
			req.charId = charId;
			next();
		}
	},
	redisKeyGen: (req, res, next) => {
		req.redisKeys = config.redis.keys(req.charId);

		next();
	},
	readThroughCache: type => (req, res, next) => {
		const keyQueryMap = {
			charList: charListQuery,
			summary: summaryQuery,
			movelist: movelistQuery,
		};

		req.app.locals.redis.get(req.redisKeys[type], async (err, reply) => {
			const { rows } = reply
				? { rows: JSON.parse(reply) }
				: await keyQueryMap[type](req.app.locals.pg, req.charId);

			if (!reply && rows) {
				req.app.locals.redis.set(req.redisKeys[type], JSON.stringify(rows));
			}

			req.data = rows;
			next();
		});
	},
};

module.exports = middleware;
