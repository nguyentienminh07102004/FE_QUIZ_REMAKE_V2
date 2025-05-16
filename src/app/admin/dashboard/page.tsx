import { countAllCategory } from "@/apis/CategoryService";
import { countAllQuestion } from "@/apis/QuestionService";
import { countAllTestResult } from "@/apis/TestResultService";
import { countAllTest } from "@/apis/TestService";
import NumberOfPlayerParticipatingChart from "@/app/admin/dashboard/NumberOfPlayerParticipartingChart";
import NumberOfPlayerParticipatingForTimeChart from "@/app/admin/dashboard/NumberOfPlayerParticipatingForTimeChart";
import { Col, Row } from "antd";
import Link from "next/link";
import { BsQuestionCircleFill } from "react-icons/bs";

export default async function Dashboard() {
	const countAllCategories: number = (await countAllCategory()).data;
	const countAllQuestions: number = (await countAllQuestion()).data;
	const countAllTestResults: number = (await countAllTestResult()).data;
	const countAllTests: number = (await countAllTest()).data;
	return (
		<>
			<Row gutter={[16, 50]}>
				<Col lg={6} xs={24} md={12}>
					<Link
						href="/admin/questions"
						className="px-8 bg-pink-600 py-10 rounded-md flex justify-between items-center"
					>
						<div className="text-xl text-white">
							<div className="text-2xl">{countAllQuestions}</div>
							<div>Questions</div>
						</div>
						<div className="text-3xl text-white">
							<BsQuestionCircleFill />
						</div>
					</Link>
				</Col>
				<Col lg={6} xs={24} md={12}>
					<Link
						href="/admin/categories"
						className="px-8 bg-pink-600 py-10 rounded-md flex justify-between items-center"
					>
						<div className="text-xl text-white">
							<div className="text-2xl">{countAllCategories}</div>
							<div>Categories</div>
						</div>
						<div className="text-3xl text-white">
							<BsQuestionCircleFill />
						</div>
					</Link>
				</Col>
				<Col lg={6} xs={24} md={12}>
					<div className="px-8 bg-pink-600 py-10 rounded-md flex justify-between items-center">
						<div className="text-xl text-white">
							<div className="text-2xl">{countAllTests}</div>
							<div>Tests</div>
						</div>
						<div className="text-3xl text-white">
							<BsQuestionCircleFill />
						</div>
					</div>
				</Col>
				<Col lg={6} xs={24} md={12}>
					<div className="px-8 bg-pink-600 py-10 rounded-md flex justify-between items-center">
						<div className="text-xl text-white">
							<div className="text-2xl">
								{countAllTestResults}
							</div>
							<div>Test Results</div>
						</div>
						<div className="text-3xl text-white">
							<BsQuestionCircleFill />
						</div>
					</div>
				</Col>
				<Col span={24}>
					<NumberOfPlayerParticipatingChart />
				</Col>
				<Col span={24}>
					<NumberOfPlayerParticipatingForTimeChart />
				</Col>
			</Row>
		</>
	);
}
