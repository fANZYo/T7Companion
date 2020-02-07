import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles/base.scss';

import Pages from './pages';

export default () => (
	<BrowserRouter>
		<Pages />
	</BrowserRouter>
)
