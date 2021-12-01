interface heightAndWeight {
	height: number,
	weight: number
}

const parse = (args: Array<string>): heightAndWeight => {
	const measurements = args.slice(2).map(v => Number(v));
	let isNumber;
	for (const d of measurements) { if (isNaN(d)) { isNumber = false; } }
	if (measurements.length === 2 && isNumber ) {
		throw new Error('Need your height in centimeters and weight in kilograms.');
	}

	return {
		height: measurements[0],
		weight: measurements[1]
	};
};

export const calculateBMI = (height: number, weight: number): string => {
	if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
		const result: number = weight/((height*height)/10000);
		const isBetween = (bottom: number, ceiling: number): boolean => 
			result > bottom && result < ceiling;

		switch (true) {
			case result < 16:
				return 'Severely underweight';
			case isBetween(16, 17):
				return 'Moderately underweight';
			case isBetween(17, 18.5):
				return 'Mildly underweight';
			case isBetween(18.5, 30):
				return 'Normal (healthy weight)';
			case isBetween(25, 30):
				return 'Pre-obese';
			case isBetween(30, 35):
				return 'Obese (Class I)';
			case isBetween(35, 40):
				return 'Obese (Class II)';
			case result > 40:
				return 'Obese (Class III)';
			default:
				return 'undefined';
		}
	} else {
		throw new Error('Pass numbers greater than 0 only.');
	}
};

try {
	const { height, weight } = parse(process.argv);
	console.log(calculateBMI(height, weight));
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log(error.message);
	}
}