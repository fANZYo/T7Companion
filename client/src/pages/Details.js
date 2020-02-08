import React, { useState, useEffect } from 'react';

const Details = props => {
	const { data: { charList }, match } = props;

	const [charDetails, setCharDetails] = useState({});

	useEffect(() => {
		const { name } = match.params;
		const { links } = charList.find(char => char.name === name) || {};
		const { href } = links.find(link => link.rel === 'details') || {};

		fetch(`/api${href}`)
			.then(res => res.json())
			.then(setCharDetails);
	}, [charList, match]);

	console.table(charDetails);
	return (
		<h1>HAHAHA</h1>
	);
};

export default Details;
