import React, { useState, useEffect } from 'react';

// Components
import PageLoader from 'PageLoader';
const CharDetails = React.lazy(() => import(
	/* webpackChunkName: "charDetails", */
	'CharDetails'
));

const Details = props => {
	const { data: { charList }, match } = props;

	const [isLoadingState, setLoadingState] = useState(true);
	const [charDetails, setCharDetails] = useState({});

	useEffect(() => {
		const { name } = match.params;
		const { links } = charList.find(char => char.name === name) || {};
		const { href } = links.find(link => link.rel === 'summary') || {};

		fetch(`/api${href}`)
			.then(res => res.json())
			.then(setCharDetails)
			.then(() => setLoadingState(false));
	}, [charList, match]);

	return isLoadingState
		? <PageLoader />
		: <CharDetails data={charDetails} />;
};

export default Details;
