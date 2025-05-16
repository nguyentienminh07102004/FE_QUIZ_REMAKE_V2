import { findAllCategory } from "@/apis/CategoryService";
import PaginationCustomer from "@/components/Pagination";
import APIResponse from "@/types/APIResponse";
import { CategoryResponse } from "@/types/Category";
import { PagedModel } from "@/types/PagedModel";
import { QuestionSearchRequest } from "@/types/Question";
import { Table, TableProps } from "antd";

export default async function CategoryPage({
	searchParams,
}: {
	searchParams: Promise<QuestionSearchRequest>;
}) {
	const params = await searchParams;
	const res: APIResponse = await findAllCategory(params);
	const pagedModelCategories: PagedModel<CategoryResponse> = res.data;
	const columns: TableProps<CategoryResponse>["columns"] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			ellipsis: true,
		},
		{
			title: "Code",
			key: "code",
			ellipsis: true,
			dataIndex: "code",
		},
		{
			title: "Action",
			key: "action",
		},
	];
	return (
		<>
			<Table<CategoryResponse>
				bordered
				columns={columns}
				dataSource={pagedModelCategories.content}
				pagination={false}
			/>
			<PaginationCustomer
				totalElements={pagedModelCategories.page.totalElements}
				limit={pagedModelCategories.page.size}
			/>
		</>
	);
}
