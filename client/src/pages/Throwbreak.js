import React from 'react';

// Components
import PageLoader from 'PageLoader';
const ThrowBreak = React.lazy(() => import(
	/* webpackChunkName: "throwBreak", */
	'ThrowBreak'
));

const Throwbreak = () => {
	return (
		<React.Suspense fallback={<PageLoader />}>
			<ThrowBreak />
		</React.Suspense>
	);
};

export default Throwbreak;
