import { findTestResultById } from "@/apis/TestResultService";
import Description from "@/app/test-result/[id]/result/Description";
import APIResponse from "@/types/APIResponse";
import { TestResultResponse } from "@/types/TestResult";
import { Button, Checkbox, Collapse, CollapseProps, Progress } from "antd";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export default async function PageResultTest({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const res: APIResponse = await findTestResultById(id);
	const testResult: TestResultResponse = res.data;
	const questions = testResult.test.questions;
	const answerSelected = testResult.answerSelected;
	const items: CollapseProps["items"] = [];
	for (const question of questions) {
		const answerSel = answerSelected.find(
			(answer) => answer.questionId === question.id
		);

		items.push({
			key: question.id,
			label: question.title,
			children: (
				<>
					<div>{question.content}</div>
					{question.answers.map((answer) => (
						<div
							key={answer.id}
							className={answer.isCorrect ? "bg-green-600" : ""}
						>
							<Checkbox
								disabled
								defaultChecked={answerSel?.answerIds.includes(
									answer.id
								)}
							/>
							{answer.content}
						</div>
					))}
				</>
			),
			extra:
				answerSel?.status &&
				answerSel?.status.toString() === "CORRECT" ? (
					<FaCheck />
				) : (
					<FaTimes />
				),
		});
	}
	return (
		<>
			<div className="max-w-[1200px] mx-auto pt-11">
				<div className="flex justify-evenly items-center pb-11">
					<Progress
						type="circle"
						percent={
							(testResult.score /
								testResult.test.questions.length) *
							100
						}
					/>
					<div>
						<Description answerSelected={answerSelected} />
					</div>
				</div>
				<Collapse items={items} size="large" />
				<div className="flex justify-evenly items-center mt-10">
					<Button href={`/tests/${testResult.test.id}`}>
						Do again
					</Button>
					<Button href={`/`}>Home</Button>
				</div>
			</div>
		</>
	);
}
