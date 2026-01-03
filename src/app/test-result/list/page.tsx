import GetToken from "@/commons/utils/GetToken";
import { TestResponse } from "@/types/Test";
import { UserResponse } from "@/types/User";
import { Card, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface AnswerSelectedResponse {
	answerIds: string[];
	questionId: string;
	status: "CORRECT" | "INCORRECT" | "UNANSWERED";
}

interface TestResultResponse {
	id: string;
	test: TestResponse;
	user: UserResponse;
	score: number;
	startedDate: string;
	finishDate: string;
	answerSelected: AnswerSelectedResponse[];
}

async function getTestResults(): Promise<TestResultResponse[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/test-result/my-test-result`, {
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${await GetToken()}`
		},
	});

	if (!res.ok) {
		console.error("Failed to fetch test results");
		return [];
	}

	return res.json();
}

export default async function MyTestResultPage() {
	const data = await getTestResults();

	const columns: ColumnsType<TestResultResponse> = [
		{
			title: "Tên bài thi",
			dataIndex: ["test", "name"],
			key: "testName",
		},
		{
			title: "Người làm",
			dataIndex: ["user", "fullName"],
			key: "user",
		},
		{
			title: "Điểm",
			dataIndex: "score",
			key: "score",
			render: (score: number) => <span className="font-semibold">{score}</span>,
		},
		{
			title: "Bắt đầu",
			dataIndex: "startedDate",
			key: "startedDate",
			render: (date: string) => dayjs(date).format("HH:mm DD/MM/YYYY"),
		},
		{
			title: "Kết thúc",
			dataIndex: "finishDate",
			key: "finishDate",
			render: (date: string) => dayjs(date).format("HH:mm DD/MM/YYYY"),
		},
	];

	return (
		<div className="p-6">
			<Card className="rounded-2xl shadow">
				<Title level={3}>Danh sách bài thi đã làm</Title>
				<Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 5 }} />
			</Card>
		</div>
	);
}
