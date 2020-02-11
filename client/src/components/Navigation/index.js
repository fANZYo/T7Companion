import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';

const Navigation = () => (
	<nav className="Navigation">
		<ul className="Navigation__list">
			<li className="Navigation__item">
				<Link className="Navigation__link" to="/">Home</Link>
			</li>
		</ul>
	</nav>
);

export default Navigation;
