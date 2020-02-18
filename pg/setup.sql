CREATE TABLE characters (
	name VARCHAR(25) PRIMARY KEY,
	label VARCHAR(100),
	img VARCHAR
);

CREATE TABLE movelist (
	id SMALLINT PRIMARY KEY,
	char_name VARCHAR(25),
	command VARCHAR(100),
	hit_level VARCHAR(100),
	damage VARCHAR(100),
	speed VARCHAR(100),
	on_block VARCHAR(100),
	on_hit VARCHAR(100),
	on_counter VARCHAR(100),
	notes VARCHAR(100),
	is_throw BOOLEAN,
	is_common BOOLEAN,
	gif VARCHAR,
	punishable BOOLEAN,
);

CREATE TABLE combos (
	id SMALLINT PRIMARY KEY,
	char_name VARCHAR(25),
	starter VARCHAR(100),
	combo VARCHAR(100),
	is_wall BOOLEAN,
);

COPY characters FROM '/docker-entrypoint-initdb.d/characters.csv' DELIMITER ',' CSV HEADER;
COPY movelist FROM '/docker-entrypoint-initdb.d/movelist.csv' DELIMITER ',' CSV HEADER;
COPY combos FROM '/docker-entrypoint-initdb.d/combos.csv' DELIMITER ',' CSV HEADER;
