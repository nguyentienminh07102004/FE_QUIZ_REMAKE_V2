import { TestResponse } from "@/types/Test";
import { UserResponse } from "@/types/User";

export interface TestResultResponse {
	id: string;
    test: TestResponse;
    user: UserResponse;
	score: number;
    startedDate: Date;
    finishDate: Date;
    answerSelected: {
		answerIds: string[];
		questionId: string;
		status: AnswerSelectedStatus
	}[];
}

export interface TestResultFinish {
	id: string;
    finishDate: Date;
}

export enum AnswerSelectedStatus {
	CORRECT,
	INCORRECT,
	NOT_ANSWER
}