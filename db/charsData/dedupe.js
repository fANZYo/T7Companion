const fs = require('fs');

function isEquivalent(a, b) {
	// Create arrays of property names
	const aProps = Object.getOwnPropertyNames(a);
	const bProps = Object.getOwnPropertyNames(b);

	// If number of properties is different,
	// objects are not equivalent
	if (aProps.length !== bProps.length) {
		return false;
	}

	for (let i = 0; i < aProps.length; i += 1) {
		const propName = aProps[i];

		// If values of same property are not equal,
		// objects are not equivalent
		if (a[propName] !== b[propName]) {
			return false;
		}
	}

	// If we made it this far, objects
	// are considered equivalent
	return true;
}

if (process.argv[2] === 'merge') {
	const temp = process.argv.slice(3).filter(arg =>
		!(/characters|dedupe|allCharactersData/.test(arg)));

	const merged = [];

	temp.forEach(file => {
		merged.push(JSON.parse(fs.readFileSync(file, 'utf-8')));
	});

	fs.writeFile('allCharactersData.json', JSON.stringify(merged, null, '\t'), err => {
		if (err) {
			console.log(err);
			return;
		}

		console.log('Success');
	});
} else {
	fs.readFile(process.argv[2], (err, buf) => {
		const charObj = JSON.parse(buf.toString());
		let { movelist } = charObj;
		console.log(movelist.length);

		movelist = movelist.reverse().filter((move, i, list) =>
			!list.some((el, j) => {
				if (j <= i) {
					return false;
				}

				return isEquivalent(el, move);
			})).reverse();

		console.log(movelist.length);

		fs.writeFile(process.argv[2], JSON.stringify(Object.assign(charObj, { movelist }), null, '\t'), err => {
			if (err) {
				console.log(err);
			}

			console.log('Successfully Written to File.');
		});
	});
}
