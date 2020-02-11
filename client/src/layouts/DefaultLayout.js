import React from 'react';
import { Route } from 'react-router-dom';

// Components
import PageLoader from 'PageLoader';

const Navigation = React.lazy(() => import(
	/* webpackChunkName: "navigation", */
	'Navigation'
));
const LogoBanner = React.lazy(() => import(
	/* webpackChunkName: "logoBanner", */
	'LogoBanner'
));

const DefaultLayout = props => {
	const { component: Component, data, ...rest } = props;

	return (
		<Route { ...rest } render={matchProps => (
			<React.Suspense fallback={<PageLoader />}>
				<LogoBanner />
				<Navigation />

				<div className="wrapper">
					<Component { ...matchProps } data={data} />
				</div>
			</React.Suspense>
		)} />
	)
};

export default DefaultLayout;
