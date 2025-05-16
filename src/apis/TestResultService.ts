"use server";
import apis from "@/apis/base";
import APIResponse from "@/types/APIResponse";
import { TestResultFinish } from "@/types/TestResult";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export const startTest = async ({
	testId,
	startedDate,
}: {
	testId: string;
	startedDate: Date;
}) => {
	const cookieStorage = await cookies();
	const res: APIResponse = (
		await apis.post(
			"/test-result/start",
			{ testId, startedDate },
			{
				headers: {
					Authorization: `Bearer ${cookieStorage.get("token")?.value
						}`,
				},
			}
		)
	).data;
	return res;
};

export const findTestResultById = async (id: string) => {
	const cookieStorage = await cookies();
	const res: APIResponse = (
		await apis.get(`/test-result/${id}`, {
			headers: {
				Authorization: `Bearer ${cookieStorage.get("token")?.value}`,
			},
		})
	).data;
	return res;
};

export const findTestByTestResultId = async (id: string) => {
	const cookieStorage = await cookies();
	const res: APIResponse = (
		await apis.get(`/test-result/test/${id}`, {
			headers: {
				Authorization: `Bearer ${cookieStorage.get('token')?.value}`
			}
		})
	).data;
	return res;
};

export const findAnswerSelectedOfTestResult = async (testResultId: string, questionId: string) => {
	const cookieStorage = await cookies();
	const res: AxiosResponse<APIResponse> = await apis.get(`/test-result/${testResultId}/question/${questionId}`, {
		headers: {
			Authorization: `Bearer ${cookieStorage.get('token')?.value}`
		}
	});
	return res.data;
}

export const saveAnswerSelectOfTestResult = async (testResultId: string, questionId: string, answerId: string) => {
	const cookieStorage = await cookies();
	const res: AxiosResponse<APIResponse> = await apis.post(`/test-result/save-answer-test-result`, {
		testResultId,
		questionId,
		answerId
	}, {
		headers: {
			Authorization: `Bearer ${cookieStorage.get('token')?.value}`
		}
	});
	return res.data;
}

export const finishTestResult = async (testResultFinish: TestResultFinish) => {
	const cookieStorage = await cookies();
	const res: APIResponse = (
		await apis.post(
			`/test-result/finish`,
			testResultFinish,
			{
				headers: {
					Authorization: `Bearer ${cookieStorage.get("token")?.value
						}`,
				},
			}
		)
	).data;
	return res;
};

export const countAllTestResult = async (): Promise<APIResponse> => {
	const cookieStorage = await cookies();
	return (await apis.get("/test-result/count", {
		headers: {
			Authorization: `Bearer ${cookieStorage.get('token')?.value}`
		}
	})).data;
};

export const numberOfPlayerParticipating = async (limit: number = 10): Promise<APIResponse> => {
	const cookieStorage = await cookies();
	return (await apis.get('/test-result/number-of-player-participating-test', {
		params: { limit },
		headers: {
			Authorization: `Bearer ${cookieStorage.get('token')?.value}`
		}
	})).data;
}

export const numberOfPlayerParticipatingForTime = async (): Promise<APIResponse> => {
	const cookieStorage = await cookies();
	return (await apis.get('/test-result/number-of-player-participating-test-for-time', {
		headers: {
			Authorization: `Bearer ${cookieStorage.get('token')?.value}`
		}
	})).data;
}