"use client";

import { deleteQuestion } from "@/apis/QuestionService";
import { NotificationCustomer } from "@/components/Notification";
import { QuestionResponse } from "@/types/Question";
import { Button, Table, TableProps } from "antd";
import { useRouter } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { ImBin2 } from "react-icons/im";

export default function QuestionTableComponent({
	listQuestion,
}: {
	listQuestion: QuestionResponse[];
}) {
	const router = useRouter();
	const [contextHolder, openNotificationWithIcon] = NotificationCustomer({
		message: "Success",
		description: "Success",
	});
	const columns: TableProps<QuestionResponse>["columns"] = [
		{
			title: <div className="text-center">ID</div>,
			dataIndex: "id",
			ellipsis: true,
		},
		{
			title: <div className="text-center">Title</div>,
			dataIndex: "title",
		},
		{
			title: <div className="text-center">Category</div>,
			dataIndex: ["category", "name"],
			render: (value: string) => (
				<div className="text-center">{value}</div>
			),
		},
		{
			title: <div className="text-center">Number of answers</div>,
			render: (_, question: QuestionResponse) => (
				<div className="text-center">{question.answers.length}</div>
			),
		},
		{
			title: <div className="text-center">Action</div>,
			render: (_, value) => {
				return (
					<>
						<div className="flex justify-evenly items-center">
							<FaPencilAlt
								onClick={() =>
									router.push(
										`/admin/questions/update/${value.id}`
									)
								}
							/>
							<ImBin2
								onClick={async () => {
									await deleteQuestion([value.id]);
									router.refresh();
									openNotificationWithIcon();
								}}
							/>
						</div>
					</>
				);
			},
		},
	];
	return (
		<>
			{contextHolder}
			<div className="flex justify-end mb-4 items-center">
				<Button
					icon={<FaPlus />}
					variant="filled"
					color="blue"
					className="bg-green-600"
					href="/admin/questions/create"
				>
					New Question
				</Button>
			</div>
			<Table<QuestionResponse>
				className="cursor-pointer"
				dataSource={listQuestion}
				columns={columns}
				pagination={false}
			/>
		</>
	);
}
