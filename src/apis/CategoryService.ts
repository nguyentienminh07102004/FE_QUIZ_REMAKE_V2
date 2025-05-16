"use server"
import apis from "@/apis/base";
import APIResponse from "@/types/APIResponse";
import { cookies } from "next/headers";

export const findAllCategory = async ({
	page = 1,
	limit = 10,
}: {
	page?: number;
	limit?: number;
}) => {
	return (await apis.get("/categories", {
		params: { page, limit },
	})).data;
};

export const countAllCategory = async (): Promise<APIResponse> => {
	const cookieStorage = await cookies();
	return (await apis.get("/categories/count", {
		headers: {
			Authorization: `Bearer ${cookieStorage.get('token')?.value}`
		}
	})).data;
}