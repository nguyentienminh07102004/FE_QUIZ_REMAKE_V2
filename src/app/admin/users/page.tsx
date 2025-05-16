import { findAllUser } from "@/apis/UserService";
import TableUserComponent from "@/app/admin/users/TableUserComponent";
import PaginationCustomer from "@/components/Pagination";
import APIResponse from "@/types/APIResponse";
import { PagedModel } from "@/types/PagedModel";
import { UserResponse, UserSearchRequest } from "@/types/User";

export default async function UserPage({
	searchParams,
}: {
	searchParams: Promise<UserSearchRequest>;
}) {
	const userSearchRequest: UserSearchRequest = await searchParams;
	const res: APIResponse = await findAllUser(userSearchRequest);
	const listUser: PagedModel<UserResponse> = res.data;
	listUser.content.forEach((user) => (user.key = user.id));
	return (
		<>
			<TableUserComponent listUser={listUser.content} />
			<PaginationCustomer
				totalElements={listUser.page.totalElements}
				limit={listUser.page.size}
			/>
		</>
	);
}
