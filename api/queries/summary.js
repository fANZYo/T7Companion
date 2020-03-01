const config = require('../config');

const summaryQuery = (pg, charId) => pg
	.query(`
		SELECT
			char_name,
			command,
			punishable
		FROM ${config.db.tables.movelist}
		WHERE char_name = '${charId}' AND punishable IS NOT NULL
	`);

module.exports = summaryQuery;
