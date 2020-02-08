import React, { useState, useEffect } from 'react';

// Components
import PageLoader from 'PageLoader';

const Home = () => {
	const [charList, setCharList] = useState(null);

	useEffect(() => {
		fetch('/api/characters')
			.then(res => res.json())
			.then(chars => { console.log(chars); return chars; })
			.then(setCharList);
	}, []);

	return (
		<h1>
			HELLO HOME
		</h1>
	);
};

export default Home;
