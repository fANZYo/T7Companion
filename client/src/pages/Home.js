import React from 'react';

// Components
const CharList = React.lazy(() => import(
	/* webpackChunkName: "charList", */
	'CharList'
));

const Home = props => {
	const { data: { charList } } = props;

	return (
		<CharList list={charList} />
	);
};

export default Home;
