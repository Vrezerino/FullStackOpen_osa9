import React from "react";
import { courseParts } from "../types";

const Total = ({ courseParts }: courseParts) => {
	return (
		<>
			<hr />
			<p>
				Number of exercises:{" "}
				{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
			</p>
		</>
	);
};

export default Total;