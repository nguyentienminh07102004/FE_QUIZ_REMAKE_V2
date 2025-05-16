export interface UserResponse {
	key?: string;
	id: string;
	email: string;
	fullName: string;
	avatar: string;
	status: UserStatus;
	role: RoleResponse;
}

export enum UserStatus {
	ACTIVE="ACTIVE",
	INACTIVE="INACTIVE",
}

export interface RoleResponse {
	name: string;
	code: string;
}

export interface UserSearchRequest {
	email?: string;
	fullName?: string;
	page?: number;
	limit?: number;
}

export interface UserRegister {
	email: string;
	password: string;
	confirmPassword: string;
	fullName: string;
	status: UserStatus,
	roleCode: "USER" | "ADMIN"
}
