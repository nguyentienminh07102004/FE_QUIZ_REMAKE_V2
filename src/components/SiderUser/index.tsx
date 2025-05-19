"use client";
import { findAllCategory } from "@/apis/CategoryService";
import CategoryItem from "@/components/SiderUser/CategoryItem";
import APIResponse from "@/types/APIResponse";
import { CategoryResponse } from "@/types/Category";
import { PagedModel } from "@/types/PagedModel";
import { Pagination } from "antd";
import React from "react";

export default function SiderUser() {
	const [pagedModelCategory, setPagedModelCategory] = React.useState<
		PagedModel<CategoryResponse>
	>({
		content: [],
		page: { size: 10, totalElements: 0, totalPages: 0, number: 1 },
	});
	const [page, setPage] = React.useState<number>(1);
	const changePage = (page: number) => {
		setPage(page);
	};
	React.useEffect(() => {
		const fetchData = async () => {
			const res: APIResponse = await findAllCategory({
				page: page,
				limit: 10,
			});
			const pagedModelCategory: PagedModel<CategoryResponse> = res.data;
			pagedModelCategory.content.forEach(
				(category) => (category.key = category.code)
			);
			setPagedModelCategory(pagedModelCategory);
		};
		fetchData();
	}, [page]);
	return (
		<>
			<div className="max-sm:hidden">
				{pagedModelCategory.content.map((category) => (
					<CategoryItem category={category} key={category.code} />
				))}
				<Pagination
					align="start"
					showSizeChanger={false}
					className="mt-3"
					total={pagedModelCategory.page.totalElements || 0}
					current={pagedModelCategory.page.number + 1 || 1}
					pageSize={pagedModelCategory.page.size || 10}
					onChange={changePage}
					simple={true}
				/>
			</div>
		</>
	);
}
