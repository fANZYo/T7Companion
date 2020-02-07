import React from 'react';
import { Switch } from 'react-router-dom';

// Layouts
import DefaultLayout from '../layouts/DefaultLayout';

// Components
import Home from './Home';

export default () => (
	<Switch>
		<DefaultLayout exact path="/" component={Home} />
	</Switch>
);
