import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';

const CharList = (props) => {
	const { list } = props;

	const getCharProfileLink = name => `/characters/${name}`;
	const getCharImage = name => `/assets/${name}.png`;

	return (
		<ul className="CharList">
			{list.map(char => (
				<li
					key={char.name}
					className="CharList__item"
				>
					<div className="CharList__wrapper">
						<Link to={getCharProfileLink(char.name)} className="CharList__content">
							<img
								className="CharList__portrait"
								src={getCharImage(char.name)}
								alt={char.name}
							/>
							<div className="CharList__label">
								{char.label}
							</div>
						</Link>
					</div>
				</li>
			))}
		</ul>
	);
};

export default CharList;
