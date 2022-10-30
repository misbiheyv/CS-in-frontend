import STATE from './State.js';

export default function numberParser() {
	const 
		iter = gen();

	let 
		expression = '',
		state = STATE.initial;

	function* gen() {
		let input = '';

		while (true) {
			for (const char of input) {
				switch (char) {
					case '-':
						if (state !== STATE.initial && state !== STATE.exp) {
							throw new SyntaxError('Invalid number');
						}

						expression += char;
						state = STATE.expMinus;
						break;

					case 'e':
						if (state !== STATE.intNumber && state !== STATE.decNumber) {
							throw new SyntaxError('Invalid number');
						}

						expression += char;
						state = STATE.exp;
						break;

					case '.':
						if (state !== STATE.intNumber && state !== STATE.initial) {
							throw new SyntaxError('Invalid number');
						}

						expression += char;
						state = STATE.dot;
						break;

					default:
						if (input.length === 0) break;

						if (!/\d+/.test(char)) {
							throw new SyntaxError('Invalid number');
						}

						if (state === STATE.exp || state === STATE.expMinus) {
							state = STATE.expNumber;
						} else if (state === STATE.dot || state === STATE.decNumber) {
							state = STATE.decNumber;
						}

						state = STATE.intNumber;
						expression += char;
						break;
				}
			}

			input = yield expression;
		}
	}

	iter.next();

	return Object.defineProperties(
		{},
		{
			return: {
				value: () => iter.return(parseFloat(expression)),
			},
			next: {
				value: (v) => iter.next(v),
			},
		}
	);
}