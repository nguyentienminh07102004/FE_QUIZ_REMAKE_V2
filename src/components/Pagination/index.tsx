"use client";

import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationCustomer({
	totalElements,
	limit,
	simple = false,
}: {
	totalElements: number;
	limit: number;
	simple?: boolean;
}) {
	const searchParams = useSearchParams();
	const pathName: string = usePathname();
	const { push } = useRouter();
	const changePage = (page: number, pageSize: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", String(page));
		params.set("limit", String(pageSize));
		push(`${pathName}?${params.toString()}`);
	};

	return (
		<>
			<Pagination
				align="center"
				showSizeChanger={{
					options: [
						{
							label: 10,
							value: 10,
						},
						{
							label: 20,
							value: 20,
						},
						{
							label: 30,
							value: 30,
						},
					],
				}}
				className="mt-3"
				total={totalElements || 0}
				current={parseInt(searchParams.get("page") || "1")}
				pageSize={limit || 10}
				onChange={changePage}
				simple={simple}
			/>
		</>
	);
}
