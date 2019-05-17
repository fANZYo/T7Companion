module.exports = {
	database: {
		url: 'mongodb://localhost:27017/t7api',
		collection: 'characters',
	},
	redis: {
		url: 'redis://localhost:6379',
	},
	characters: [
		'asuka',
		'bryan',
		'dragunov',
		'josie',
		'kazuya',
		'law',
		'paul',
		'shaheen',
	],
};
