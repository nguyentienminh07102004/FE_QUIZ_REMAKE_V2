import { CategoryResponse } from "@/types/Category";
import { QuestionResponse } from "@/types/Question";

export interface TestResponse {
	id: string;
	title: string;
	description?: string;
	difficulty?: Difficulty,
	category: CategoryResponse,
	questions: QuestionResponse[],
	testRating: TestRatingResponse
}

export interface TestSearchRequest {
	id?: string;
	title?: string;
	difficulty?: Difficulty;
	page?: number;
	limit?: number;
}

export enum Difficulty {
	EASY="EASY",
	MEDIUM="MEDIUM",
	HARD="HARD"
}

export interface TestRatingResponse {
	rating: number;
	numberOfRatings: number;
}

export interface TestRequest {
	title: string;
	description?: string;
	difficulty?: Difficulty;
	categoryCode: string;
	questionIds: string[];
}