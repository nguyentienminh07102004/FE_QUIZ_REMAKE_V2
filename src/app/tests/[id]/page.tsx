import { findTestById } from "@/apis/TestService";
import DescriptionTest from "@/app/tests/[id]/Description";
import PlayTest from "@/app/tests/[id]/Play";
import { TestListHasSameCategory } from "@/app/tests/[id]/TestListHasSameCategory";
import APIResponse from "@/types/APIResponse";
import { TestResponse } from "@/types/Test";
import { Row, Col, Card } from "antd";

export default async function TestDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
	const id = (await params).id;
	const res: APIResponse = await findTestById(id);
	const test: TestResponse = res.data;
	return (
		<div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "2rem" }}>
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<Card>
						<PlayTest test={test} />
					</Card>
					<Card style={{ marginTop: "1rem" }}>
						<DescriptionTest test={test} />
					</Card>
				</Col>
				<Col span={12}>
					<h1 className="text-center text-2xl bg-blue-400 rounded-md mb-3">Danh sách bài thi liên quan</h1>
					<TestListHasSameCategory categoryCode={test.category.code} />
				</Col>
			</Row>
		</div>
	);
}
