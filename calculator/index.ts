/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
const app = express();
app.use(express.json());
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);
	let bmi: string;

	try {
		bmi = calculateBMI(height, weight);
		res.json({ weight, height, bmi }).status(200);
	} catch (error: unknown) {
		if (error instanceof Error) console.log(error.message);
		res.json({ error: 'malformatted parameters' }).status(400);
	}
});
app.post('/exercises', (req: express.Request, res) => {
	const body = req.body;
	const bodyLength: number = Object.keys(body).length;
	if (bodyLength < 2 || bodyLength > 2) {
		res.json({ error: 'parameters missing or too many parameters' })
			.status(400);
	}
	let result: object;
	try {
		result = calculateExercises(Object(body.daily_exercises), Number(body.target));
		res.json(result).status(200);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.json({ error: 'malformatted parameters' })
				.status(400);
		}
	}
});

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});