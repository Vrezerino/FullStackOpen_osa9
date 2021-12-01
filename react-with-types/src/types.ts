export interface courseParts {
	courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface C2 extends CoursePartBase {
	description: string
}

interface CourseNormalPart extends C2 {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends C2 {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseRequirementPart extends C2 {
	type: "special",
	requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementPart;