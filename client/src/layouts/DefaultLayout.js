import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

// Components
import PageLoader from 'PageLoader';
const navigationPromise = import(/* webpackChunkName: "navigation" */ 'Navigation');
const logoBannerPromise = import(/* webpackChunkName: "logoBanner" */ 'LogoBanner');

const DefaultLayout = props => {
	const { component: Component, data, ...rest } = props;

	const [isLoadingState, setLoadingState] = useState(true);
	const [components, setComponents] = useState({
		Navigation: null,
		LogoBanner: null,
	});

	const {
		Navigation,
		LogoBanner,
	} = components;

	useEffect(() => {
		Promise.all([
			navigationPromise,
			logoBannerPromise,
		])
			.then(([
				{ Navigation },
				{ LogoBanner },
			]) => {
				setComponents({
					Navigation,
					LogoBanner,
				});
				setLoadingState(false);
			});
	}, []);

	return (
		<Route { ...rest } render={matchProps => (
			<React.Fragment>
				{ isLoadingState
					? <PageLoader />
					: (
						<React.Fragment>
							<LogoBanner />
							<Navigation />

							<div className="wrapper">
								<Component { ...matchProps } data={data} />
							</div>
						</React.Fragment>
					)
				}
			</React.Fragment>
		)} />
	)
};

export default DefaultLayout;
