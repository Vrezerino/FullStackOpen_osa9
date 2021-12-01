interface Result {
	periodLength: number,
	trainingDays: number,
	target: number,
	average: number,
	success: boolean,
	rating: number,
	ratingDescription: string
}

interface toBeCalculated {
	target: number,
	period: Array<number>
}

const parseArguments = (args: Array<string>): toBeCalculated => {
	let yay = true;
	const period: Array<number> = args.slice(3).map(d => Number(d));
	for (const d of period) { if (isNaN(d)) { yay = false; } }

  if (!isNaN(Number(args[2])) && args.length > 3 && yay) {
    return {
      target: Number(args[2]),
      period
		};
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
	if (typeof dailyExerciseHours !== 'object' || isNaN(target)) {
		throw new Error('No valid array or target hours provided.');
	}
	// Determine success of training
	let success = true;
	const lazydays: Array<number> = [];
	for (const day of dailyExerciseHours) {
		if (isNaN(day) || day < 0) {
			throw new Error(`Negative or non-numeric exercise hours make no sense, don't they?`);
		}
		if (day < target) {
			success = false;
		}
		if (day === 0) {
			lazydays.push(day);
		}
	}
	// Calculate rating of exercise. Bigger ratio = worse rating.
	const ratio: number = lazydays.length / (dailyExerciseHours.length);
	const rating =
		ratio > 0.28571 ? (ratio > 0.42857 ? 1 : 2) : 3;

	const ratingDescription = 
		rating < 3 ? 
			(rating < 2 ? 'You need lots of improvement!' 
				: 'Not too bad of an exercise!') 
			: (success ? 'Excellent!' : `Nice, but didn't reach target yet!`);

	return {
		periodLength: dailyExerciseHours.length,
		trainingDays: dailyExerciseHours.filter(d => d > 0).length,
		target,
		average: dailyExerciseHours.reduce((a, b) => (a + b)) / dailyExerciseHours.length,
		success,
		rating,
		ratingDescription
	};
};

try {
	const { target, period } = parseArguments(process.argv);
	console.log(calculateExercises(period, target));
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log(error.message);
	}
}