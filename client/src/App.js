import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Components
import PageLoader from 'PageLoader';

// Pages
import Pages from './pages';

// Styles
import './styles/base.scss';

export default () => {
	const [isLoadingState, setLoadingState] = useState(true);
	const [charList, setCharList] = useState([]);

	useEffect(() => {
		fetch('/api/characters')
			.then(res => res.json())
			.then(setCharList)
			.then(() => setLoadingState(false));
	}, []);

	return isLoadingState
		? <PageLoader />
		: (
			<BrowserRouter>
				<Pages data={{ charList }} />
			</BrowserRouter>
		);
};
