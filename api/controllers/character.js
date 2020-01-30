const FuzzySearch = require('fuzzy-search');
const config = require('../config');

exports.index = (req, res) => {
	res.send('Please provide a character (e.g. /character/josie)');
};

exports.characterList = (req, res) => {
	req.app.locals.redis.get('list:all', async (err, reply) => {
		const temp = JSON.parse(reply) || await req.app.locals.db
			.collection(config.database.listCollection)
			.find().toArray();

		if (!reply) {
			req.app.locals.redis.set('list:all', JSON.stringify(temp));
		}

		res.set({
			'Access-Control-Allow-Origin': 'http://frankenstein.local.com:3002',
		})
			.json(temp);
	});
};

exports.commandSearch = (req, res, next) => {
	if (req.query.cmd) {
		const searcher = new FuzzySearch(req.movelist, ['cmd'], { sort: true });
		const matchedMovelist = searcher.search(req.query.cmd);

		res.set({
			'Access-Control-Allow-Origin': 'http://frankenstein.local.com:3002',
		}).json(req.query.exact === true ? matchedMovelist[0] : matchedMovelist);
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

	const sortBy = prop => (a, b) =>
		Math.abs(parseInt(a[prop], 10)) - Math.abs(parseInt(b[prop], 10));

	const singleHitFilter = () => move => move.hit.split(',').length === 1;

	// These props map to query strings (case insensitive)
	const filterOptions = {
		singlehit: singleHitFilter,
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

	const sortOptions = {
		speed: sortBy('speed'),
		block: sortBy('onBlock'),
		hit: sortBy('onHit'),
		counter: sortBy('onCounter'),
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

	const { movelist } = req;

	const movelistCpy = Object.entries(filters)
		.reduce((list, [filter, value]) =>
			list.filter(filterOptions[filter](value)), movelist);

	const sorts = req.query.sort && req.query.sort
		.split(',')
		.filter(s => s in sortOptions)
		.reverse();

	if (sorts) {
		sorts.forEach(s => movelistCpy.sort(sortOptions[s]));
	}

	res.set({
		'Access-Control-Allow-Origin': 'http://frankenstein.local.com:3002',
	})
		.json(movelistCpy);
};
