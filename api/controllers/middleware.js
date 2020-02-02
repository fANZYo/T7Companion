const config = require('../config');

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
		req.redisKey = `movelist:${req.charId}`;

		next();
	},
	getCharacterMovelist: (req, res, next) => {
		req.app.locals.redis.get(req.redisKey, async (err, reply) => {
			const { rows: movelist } = reply
				? { rows: JSON.parse(reply) }
				: await req.app.locals.pg
					.query(`
						SELECT *
						FROM ${config.database.movelistTable}
						WHERE name = '${req.charId}'
					`);

			if (!reply && movelist) {
				req.app.locals.redis.set(req.redisKey, JSON.stringify(movelist));
			}

			req.movelist = movelist;

			next();
		});
	},
};

module.exports = middleware;
