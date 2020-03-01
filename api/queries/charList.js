const config = require('../config');

const charListQuery = pg => pg
	.query(`
		SELECT
			name,
			label,
			img
		FROM ${config.db.tables.characters}
	`);

module.exports = charListQuery;
