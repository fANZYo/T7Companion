import React from 'react';
import { Switch } from 'react-router-dom';

// Components
import PageLoader from 'PageLoader';

const Home = React.lazy(() => import(
	/* webpackChunkName: "home", */
	'./Home'
));
const Details = React.lazy(() => import(
	/* webpackChunkName: "details", */
	'./Details'
));

// Layouts
const DefaultLayout = React.lazy(() => import(
	/* webpackChunkName: "defaultLayout", */
	'../layouts/DefaultLayout'
));

export default props => {
	const { data } = props;

	return (
		<React.Suspense fallback={<PageLoader />}>
			<Switch>
				<DefaultLayout exact path="/" component={Home} data={data} />
				<DefaultLayout exact path="/characters" component={Home} data={data} />
				<DefaultLayout path="/characters/:name" component={Details} data={data} />
			</Switch>
		</React.Suspense>
	);
};
