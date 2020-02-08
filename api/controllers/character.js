const FuzzySearch = require('fuzzy-search');
const config = require('../config');

exports.characterList = (req, res) => {
	req.app.locals.redis.get('list:all', async (err, reply) => {
		const { rows } = reply
			? { rows: JSON.parse(reply) }
			: await req.app.locals.pg
				.query(`
					SELECT *
					FROM ${config.database.listTable}
				`);

		if (!reply && rows) {
			req.app.locals.redis.set('list:all', JSON.stringify(rows));
		}

		const response = rows.map(char => ({
			...char,
			links: [
				{ rel: 'details', method: 'GET', href: `/characters/${char.name}` },
			],
		}));

		res.set({
			'Cache-Control': 'private, max-age=86400',
		})
			.json(response);
	});
};

exports.commandSearch = (req, res, next) => {
	if (req.query.cmd) {
		const searcher = new FuzzySearch(req.movelist, ['command'], { sort: true });
		const matchedMovelist = searcher.search(req.query.cmd);

		res.set({
			'Cache-Control': 'private, max-age=86400',
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
		plusonblock: plusOn('on_block'),
		plusonhit: plusOn('on_hit'),
		plusoncounter: plusOn('on_counter'),
		minusonblock: minusOn('on_block'),
		minusonhit: minusOn('on_hit'),
		minusoncounter: minusOn('on_counter'),
		onblock: amountOf('on_block'),
		onhit: amountOf('on_hit'),
		oncounter: amountOf('on_counter'),
		lasthit: lastHit,
		firsthit: firstHit,
	};

	const sortOptions = {
		speed: sortBy('speed'),
		block: sortBy('on_block'),
		hit: sortBy('on_hit'),
		counter: sortBy('on_counter'),
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
		'Cache-Control': 'private, max-age=86400',
	})
		.json(movelistCpy);
};

exports.commonMoves = (req, res) => {
	req.app.locals.redis.get(`movelist:commons:${req.charId}`, async (err, reply) => {
		const { rows } = reply
			? { rows: JSON.parse(reply) }
			: { rows: req.movelist.filter(move => move.is_common) };

		if (!reply && rows) {
			req.app.locals.redis.set(`movelist:commons:${req.charId}`, JSON.stringify(rows));
		}

		res.set({
			'Cache-Control': 'private, max-age=86400',
		})
			.json(rows);
	});
};
