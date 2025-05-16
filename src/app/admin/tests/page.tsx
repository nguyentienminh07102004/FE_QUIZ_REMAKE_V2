import { findAll } from "@/apis/TestService";
import { TableTestComponent } from "@/app/admin/tests/TableTestComponent";
import ButtonNavigation from "@/components/ButtonNavigation/ButtonNavigation";
import PaginationCustomer from "@/components/Pagination";
import APIResponse from "@/types/APIResponse";
import { PagedModel } from "@/types/PagedModel";
import { TestResponse, TestSearchRequest } from "@/types/Test";

export default async function TestPage({
	searchParams,
}: {
	searchParams: Promise<TestSearchRequest>;
}) {
	const params = await searchParams;
	const res: APIResponse = await findAll(params);
	const pagedModelTests: PagedModel<TestResponse> = res.data;
	return (
		<>
			<ButtonNavigation href="/admin/tests/create" content="Create Test"/>
			<TableTestComponent tests={pagedModelTests.content} />
			<PaginationCustomer
				totalElements={pagedModelTests.page.totalElements}
				limit={pagedModelTests.page.size}
			/>
		</>
	);
}
