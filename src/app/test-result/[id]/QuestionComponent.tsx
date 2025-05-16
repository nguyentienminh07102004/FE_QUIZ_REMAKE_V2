"use client";

import AnswerComponent from "@/app/test-result/[id]/AnswerComponent";
import { QuestionResponse } from "@/types/Question";
import { ChangeQuestion } from "@/commons/zustand/ChangeQuestion";

export default function QuestionComponent({
	questions,
	testResultId
}: {
	questions: QuestionResponse[];
	testResultId: string;
}) {
	const questionOrder = ChangeQuestion((state) => state.questionOrder);
	return (
		<>
			<div className="w-1/2 overflow-auto max-h-full">
				<div>
					<div className="bg-gray-200 p-4 rounded-lg flex flex-col gap-4">
						<div className="text-lg font-bold">{questions[questionOrder].title}:</div>
						<div className="text-2xl font-semibold text-center">{questions[questionOrder].content}</div>
					</div>
					<div className="mt-4 flex flex-col gap-5">
						{questions[questionOrder].answers.map((answer) => (
							<AnswerComponent
								key={answer.id}
								questionId={questions[questionOrder].id}
								answer={answer}
								testResultId={testResultId}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
