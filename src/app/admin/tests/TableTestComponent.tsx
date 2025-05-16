"use client";

import { TestResponse } from "@/types/Test";
import { Table, TableProps } from "antd";

export const TableTestComponent = ({ tests }: { tests: TestResponse[] }) => {
	const columns: TableProps<TestResponse>["columns"] = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			ellipsis: true,
		},
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			ellipsis: true
		},
		{
			title: "Difficulty",
			dataIndex: "difficulty",
			key: "difficulty",
			ellipsis: true
		},
		{
			title: "Category",
			dataIndex: ['category', 'code'],
			key: "category"
		},
		{
			title: "Number Of Questions",
			key: "Questions",
			render: (_, record) => record.questions.length
		}
	];
	return (
		<>
			<Table<TestResponse> dataSource={tests} columns={columns} pagination={false} />
		</>
	);
};
