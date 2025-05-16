import { findTestByTestResultId } from "@/apis/TestResultService";
import AnswerSelectComponent from "@/app/test-result/[id]/AnswerSelectComponent";
import ButtonSubmit from "@/app/test-result/[id]/ButtonSubmit";
import QuestionComponent from "@/app/test-result/[id]/QuestionComponent";
import { TestResponse } from "@/types/Test";

export default async function DoTestPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id }: { id: string } = await params;
	const test: TestResponse = (
		await findTestByTestResultId(id)
	).data;
	return (
		<>
			<div className="h-screen w-screen flex items-center flex-col justify-center gap-10">
				<div className="flex items-center gap-10 justify-center max-w-[1200px] mx-auto">
					<QuestionComponent
						questions={test.questions}
						testResultId={id}
					/>
					<AnswerSelectComponent
						numOfQuestion={test.questions.length}
					/>
				</div>
				<ButtonSubmit id={id} />
			</div>
		</>
	);
}
