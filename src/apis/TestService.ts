import apis from "@/apis/base";
import GetToken from "@/commons/utils/GetToken";
import APIResponse from "@/types/APIResponse";
import { TestRequest, TestSearchRequest } from "../types/Test";

export const findAll = async (
	testSearch: TestSearchRequest
): Promise<APIResponse> => {
	const res: APIResponse = (
		await apis.get("/tests", {
			params: testSearch,
		})
	).data;
	return res;
};

export const findTestById = async (id: string) => {
	const res: APIResponse = (await apis.get(`/tests/${id}`)).data;
	return res;
};

export const countAllTest = async (): Promise<APIResponse> => {
	const token = await GetToken();
	return (await apis.get("/tests/count", {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})).data;
};

export const findTestRatingByTestIdAndUser = async (testId: string) => {
	const token = await GetToken();
	return (await apis.get(`/tests/rating/user/${testId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})).data;
}

export const ratingTest = async (rate: number, testId: string) => {
	const token = await GetToken();
	return (await apis.put(`/tests/rate/${testId}/${rate}`, {}, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})).data;
}

export const findAllTestsHasSameCategory = async (categoryCode: string): Promise<APIResponse> => {
	return (await apis.get(`/tests/same-category`, {
		params: { categoryCode }
	})).data;
}

export const createTestService = async (test: TestRequest) => {
	const res = await apis.post("/tests", [test], {
		headers: {
			Authorization: `Bearer ${await GetToken()}`,
			"Content-Type": "application/json"
		}
	});
	return res.data;
}