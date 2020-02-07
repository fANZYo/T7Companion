import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PageLoader from '../components/PageLoader';

const navigationPromise = import(/* webpackChunkName: "navigation" */ '../components/Navigation');

export default ({ component: Component, ...rest }) => {
	const [isLoading, setLoadingState] = useState(true);
	const [components, setComponents] = useState({
		Navigation: null,
	});

	const { Navigation } = components

	useEffect(() => {
		Promise.all([
			navigationPromise,
		])
			.then(([
				{ Navigation },
			]) => {
				setComponents({
					Navigation,
				});
				setLoadingState(false);
			});
	}, []);

	return (
		<Route { ...rest } render={matchProps => (
			<React.Fragment>
				{ isLoading
					? <PageLoader />
					: (
						<React.Fragment>
							<Navigation />

							<div className="wrapper">
								<Component { ...matchProps } />
							</div>
						</React.Fragment>
					)
				}
			</React.Fragment>
		)} />
	)
};
