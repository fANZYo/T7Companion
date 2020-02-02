CREATE TABLE characters (
	name VARCHAR(100),
	label VARCHAR(100),
	img VARCHAR
);

CREATE TABLE movelist (
	name VARCHAR(100),
	command VARCHAR(100),
	hit_level VARCHAR(100),
	damage VARCHAR(100),
	speed VARCHAR(100),
	on_block VARCHAR(100),
	on_hit VARCHAR(100),
	on_counter VARCHAR(100),
	notes VARCHAR(100),
	gif VARCHAR
);

COPY characters FROM '/docker-entrypoint-initdb.d/characters.csv' DELIMITER ',' CSV HEADER;
COPY movelist FROM '/docker-entrypoint-initdb.d/movelist.csv' DELIMITER ',' CSV HEADER;
