CREATE TABLE characters (
	name VARCHAR(25) NOT NULL PRIMARY KEY,
	label VARCHAR(50) NOT NULL,
	img VARCHAR
);

CREATE TABLE movelist (
	id SMALLSERIAL PRIMARY KEY,
	char_name VARCHAR(25) NOT NULL REFERENCES characters(name),
	command VARCHAR(100) NOT NULL,
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
	punishable VARCHAR(25)
);

CREATE TABLE combos (
	id SMALLSERIAL PRIMARY KEY,
	char_name VARCHAR(25) NOT NULL REFERENCES characters(name),
	starter VARCHAR(100) NOT NULL,
	combo VARCHAR(100) NOT NULL,
	is_wall BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE punishers (
	id SMALLSERIAL PRIMARY KEY,
	char_name VARCHAR(25) NOT NULL REFERENCES characters(name),
	command VARCHAR(100) NOT NULL,
	standing_punish VARCHAR(3),
	crouching_punish VARCHAR(3)
);

COPY characters
FROM '/docker-entrypoint-initdb.d/characters.csv' DELIMITER ',' CSV HEADER;

COPY movelist(
	char_name,
	command,
	hit_level,
	damage,
	speed,
	on_block,
	on_hit,
	on_counter,
	notes,
	is_throw,
	is_common,
	gif,
	punishable
) FROM '/docker-entrypoint-initdb.d/movelist.csv' DELIMITER ',' CSV HEADER;

COPY combos(
	char_name,
	starter,
	combo,
	is_wall
) FROM '/docker-entrypoint-initdb.d/combos.csv' DELIMITER ',' CSV HEADER;

COPY punishers(
	char_name,
	command,
	standing_punish,
	crouching_punish
) FROM '/docker-entrypoint-initdb.d/punishers.csv' DELIMITER ',' CSV HEADER;
