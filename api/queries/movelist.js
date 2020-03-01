const config = require('../config');

const movelistQuery = (pg, charId) => pg
	.query(`
		SELECT *
		FROM ${config.db.tables.movelist}
		WHERE char_name = '${charId}'
	`);

module.exports = movelistQuery;
