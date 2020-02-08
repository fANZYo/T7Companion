import React from 'react';

// Components
import PageLoader from 'PageLoader';
const CharList = React.lazy(() => import(/* webpackChunkName: "charList" */ 'CharList'));

const Home = props => {
	const { data: { charList } } = props;

	return (
		<React.Suspense fallback={<PageLoader />}>
			<CharList list={charList} />
		</React.Suspense>
	);
};

export default Home;
