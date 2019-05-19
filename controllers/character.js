const FuzzySearch = require('fuzzy-search');
const config = require('../config');

exports.index = (req, res) => {
	res.send('Please provide a character (e.g. /character/josie)');
};

exports.characterList = (req, res) => {
	req.app.locals.redis.get('list:all', async (err, reply) => {
		const temp = await req.app.locals.db
			.collection(config.database.listCollection)
			.find().toArray();

		if (!reply) {
			req.app.locals.redis.set('list:all', JSON.stringify(temp));
		}

		res.json(temp);
	});
};

exports.commandSearch = (req, res, next) => {
	if (req.query.cmd) {
		const searcher = new FuzzySearch(req.movelist, ['cmd'], { sort: true });
		const matchedMovelist = searcher.search(req.query.cmd);

		res.json(matchedMovelist);
	} else {
		next('route');
	}
};

exports.filterMovelist = (req, res) => {
	const hitLevelFilter = level => move => {
		const levels = level.split(',');
		return levels.some(l => RegExp(`\\b${l}\\b`, 'i').test(move.hit));
	};

	const amountOf = prop => amount => move => {
		const amounts = amount.split(',');

		return parseInt(move[prop], 10) >= Math.min(...amounts)
			&& parseInt(move[prop], 10) <= Math.max(...amounts);
	};

	const crushFilter = crush => move => {
		const crushes = crush.split(',');
		return crushes.some(c => RegExp(`\\b${c}\\b`, 'i').test(move.hit));
	};

	const specialPropsFilter = special => move => {
		const specials = special.split(',');
		return specials.some(s => RegExp(`\\b${s}\\b`, 'i').test(move.notes));
	};

	const plusOn = prop => () => move => move[prop].indexOf('+') > -1;

	const minusOn = prop => () => move => move[prop].indexOf('-') > -1;

	const lastHit = end => move => move.hit.indexOf(end) === move.hit.length - 1;

	const firstHit = first => move => move.hit.indexOf(first) === 0;

	// These props map to query strings (case insensitive)
	const filterOptions = {
		special: specialPropsFilter,
		crush: crushFilter,
		speed: amountOf('speed'),
		hit: hitLevelFilter,
		plusonblock: plusOn('onBlock'),
		plusonhit: plusOn('onHit'),
		plusoncounter: plusOn('onCounter'),
		minusonblock: minusOn('onBlock'),
		minusonhit: minusOn('onHit'),
		minusoncounter: minusOn('onCounter'),
		onblock: amountOf('onBlock'),
		onhit: amountOf('onHit'),
		oncounter: amountOf('onCounter'),
		lasthit: lastHit,
		firsthit: firstHit,
	};

	const filters = Object.keys(filterOptions)
		.filter(f => f in req.query)
		.map(f => {
			const temp = {};
			if (req.query[f]) {
				temp[f] = req.query[f];
			}
			return temp;
		})
		.reduce((obj, cur) => Object.assign(obj, cur), {});

	let { movelist: movelistCpy } = req;

	Object.entries(filters).forEach(([filter, value]) => {
		movelistCpy = movelistCpy.filter(filterOptions[filter](value));
	});

	res.json(movelistCpy);
};
