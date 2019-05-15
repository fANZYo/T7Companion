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
};

module.exports = middleware;
