import { AnswerRequest, AnswerResponse } from "@/types/Answer";
import { CategoryResponse } from "@/types/Category";

export interface QuestionResponse {
	key?: string;
	id: string;
	title: string;
	shortDescription: string;
	content: string;
	category: CategoryResponse;
	answers: AnswerResponse[]
}

export interface QuestionRequest {
	id?: string;
	title: string;
	shortDescription: string;
	content: string;
	categoryCode: string;
	answers: AnswerRequest[]
}

export interface QuestionSearchRequest {
	id?: string;
	title?: string;
	categoryCode?: string;
	page?: number;
	limit?: number;
}