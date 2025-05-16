'use server';
import apis from "@/apis/base";
import APIResponse from "@/types/APIResponse";
import { QuestionRequest, QuestionResponse, QuestionSearchRequest } from "@/types/Question";
import GetToken from "@/commons/utils/GetToken";
import { cookies } from "next/headers";

export const countAllQuestion = async (): Promise<APIResponse> => {
	const cookieStorage = await cookies();
	return (await apis.get("/questions/count", {
		headers: {
			Authorization: `Bearer ${cookieStorage.get('token')?.value}`
		}
	})).data;
};

export const findQuestionSearch = async (questionSearch: QuestionSearchRequest): Promise<APIResponse> => {
	return (await apis.get('/questions', {
		params: questionSearch
	})).data;
}

export const saveQuestion = async (questions: QuestionRequest[]) => {
	const token = await GetToken();
	return (await apis.post('/questions', questions, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})).data;
}

export const deleteQuestion = async (ids: string[]) => {
	const token = await GetToken();
	await apis.delete(`/questions/${ids.join(',')}`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})
}