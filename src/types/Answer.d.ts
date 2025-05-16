export interface AnswerResponse {
	id: string
    content: string;
    isCorrect: boolean;
}

export interface AnswerRequest {
    id: string | null | undefined
    content: string;
    isCorrect: boolean;
}