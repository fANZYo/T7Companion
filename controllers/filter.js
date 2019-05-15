const config = require('../config');

const hitLevelFilter = level => move => {
	const levels = level.split(',');
	return levels.some(l => RegExp(`\\b${l}\\b`, 'i').test(move.hit));
};

const speedFilter = speed => move => {
	const speeds = speed.split(',');
	return move.speed >= Math.min(...speeds) && move.speed <= Math.max(...speeds);
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

const filterOptions = {
	special: specialPropsFilter,
	crush: crushFilter,
	speed: speedFilter,
	hit: hitLevelFilter,
	plusonblock: plusOn('onBlock'),
	plusonhit: plusOn('onHit'),
	plusoncounter: plusOn('onCounter'),
	minusonblock: minusOn('onBlock'),
	minusonhit: minusOn('onHit'),
	minusoncounter: minusOn('onCounter'),
};

const filterMoves = async (req, res) => {
	const filters = Object.keys(filterOptions)
		.filter(f => f in req.query)
		.map(f => {
			const temp = {};
			temp[f] = req.query[f];
			return temp;
		})
		.reduce((obj, cur) => Object.assign(obj, cur), {});

	let { movelist } = await req.app.locals.db
		.collection(config.database.collection)
		.findOne(
			{ name: config.characters.find(c => c === req.query.c.toLowerCase()) },
		);

	Object.entries(filters).forEach(([filter, value]) => {
		movelist = movelist.filter(filterOptions[filter](value));
	});

	res.json(movelist);
};

module.exports = filterMoves;
