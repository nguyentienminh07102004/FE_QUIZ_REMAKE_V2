"use server";
import apis from "@/apis/base";
import GetToken from "@/commons/utils/GetToken";
import APIResponse from "@/types/APIResponse";
import { JWTDecoder, JWTEntity } from "@/types/Jwt";
import { UserRegister, UserSearchRequest } from "@/types/User";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const LoginAPI = async ({ email, password }: { email: string | undefined; password: string | undefined }) => {
	const res: APIResponse = (
		await apis.post("/users/login", {
			email,
			password,
			isSocial: false,
		})
	).data;
	const jwt: JWTEntity = res.data;
	const cookieStorage = await cookies();
	cookieStorage.set("token", jwt.token, {
		httpOnly: true,
		expires: new Date(jwt.expires),
	});
	const jwtDecoder: JWTDecoder = jwtDecode(jwt.token);
	if (jwtDecoder.scope.includes("ADMIN")) {
		redirect("/admin/dashboard");
	} else {
		redirect("/");
	}
};

export const LoginGoogle = async ({ code }: { code: string }) => {
	const res: APIResponse = (await apis.post("/users/login/google", { code })).data;
	const jwt: JWTEntity = res.data;
	const cookieStorage = await cookies();
	cookieStorage.set("token", jwt.token, {
		httpOnly: true,
		expires: new Date(jwt.expires),
	});
	const jwtDecoder: JWTDecoder = jwtDecode(jwt.token);
	if (jwtDecoder.scope.includes("ADMIN")) {
		redirect("/admin/dashboard");
	} else {
		redirect("/");
	}
};

export const findAllUser = async (request: UserSearchRequest): Promise<APIResponse> => {
	return (await apis.get("/users", { params: request })).data;
};

export const countAllUser = async (): Promise<APIResponse> => {
	return (await apis.get("/users/count")).data;
};

export const changeUserStatusService = async (ids: string[] | string) => {
	await apis.put(`/users/change-status/${ids.toString()}`);
};

export const uploadAvatar = async (avatar: FormData) => {
	return (
		await apis.post("/users/upload-avatar", avatar, {
			headers: {
				Authorization: `Bearer ${await GetToken()}`,
				"Content-Type": "multipart/form-data",
			},
		})
	).data;
};

export const registerUserAPI = async (user: UserRegister) => {
	return (await apis.post("/users/register", user)).data;
};

export const logoutService = async () => {
	await apis.post(
		"/users/logout",
		{},
		{
			headers: {
				Authorization: `Bearer ${await GetToken()}`,
			},
		}
	);
};

export const getUserInfo = async () => {
	const res: APIResponse = (
		await apis.get("/users/my-info", {
			headers: {
				Authorization: `Bearer ${await GetToken()}`,
			},
		})
	).data;
	return res.data;
};

export async function ForgotPasswordService(email: string) {
	const res = await apis.post(
		"/users/forgot-password",
		{ email: email },
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res.data;
}

export async function ResetPasswordService(code: string, newPassword: string, confirmPassword: string) {
	const res = await apis.put("/users/forgot-password", { code, newPassword, confirmPassword },
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res.data;
}
