import React from "react";
import { CoursePart, courseParts } from "../types";

const Content = ({ courseParts }: courseParts) => {
	return (
		<div>
			{courseParts.map(p =>
				<Part key={p.name} part={p} />
			)}
		</div>
	);
};

const Part = ({ part }: { part: CoursePart }) => {
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	const renderPart = () => {
		switch (part.type) {
			case "normal":
				return (
					<div>
						<h3>{part.name} {part.exerciseCount}</h3>
						<span>{part.description}</span>
					</div>
				);
			case "groupProject":
				return (
					<div>
						<h3>{part.name} {part.exerciseCount}</h3>
						<span>Project exercises: {part.groupProjectCount}</span>
					</div>
				);
			case "submission":
				return (
					<div>
						<h3>{part.name} {part.exerciseCount}</h3>
						<span>Submit to {part.exerciseSubmissionLink}</span>
					</div>
				);
			case "special":
				return (
					<div>
						<h3>{part.name} {part.exerciseCount}</h3>
						<span> Required skills: {part.requirements.join(", ")}</span>
					</div>
				);
			default:
				return assertNever(part);
		}
	};
	return (
		<div>
			{renderPart()}
		</div>
	);
};

export default Content;