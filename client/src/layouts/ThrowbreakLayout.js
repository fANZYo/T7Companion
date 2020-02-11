import React from 'react';
import { Route } from 'react-router-dom';

// Components
import PageLoader from 'PageLoader';

const ThrowbreakLayout = props => {
	const { component: Component, data, ...rest } = props;

	return (
		<Route { ...rest } render={matchProps => (
			<React.Suspense fallback={<PageLoader />}>
				<Component { ...matchProps } data={data} />
			</React.Suspense>
		)} />
	)
};

export default ThrowbreakLayout;
