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
	is_throw BOOLEAN,
	is_common BOOLEAN,
	gif VARCHAR,
	punishable BOOLEAN,
	standing_punish VARCHAR(100),
	crouching_punish VARCHAR(100),
	wall_carry BOOLEAN,
	wall_break BOOLEAN,
	floor_break BOOLEAN
);

CREATE TABLE combos (
	name VARCHAR(100),
	starter VARCHAR(100),
	combo VARCHAR(100)
	is_wall BOOLEAN
);

COPY characters FROM '/docker-entrypoint-initdb.d/characters.csv' DELIMITER ',' CSV HEADER;
COPY movelist FROM '/docker-entrypoint-initdb.d/movelist.csv' DELIMITER ',' CSV HEADER;
