"use client";

import { ChangeQuestion } from "@/commons/zustand/ChangeQuestion";
import { Col, Row } from "antd";

export default function AnswerSelectComponent({
	numOfQuestion,
}: {
	numOfQuestion: number;
}) {
	const changeQuestionOrder = ChangeQuestion(
		(state) => state.changeQuestionOrder
	);
	const changeQuestion = (index: number) => {
		changeQuestionOrder(index);
	};
	return (
		<>
			<Row
				gutter={[20, 20]}
				className="flex-1 bg-gray-200 p-7 rounded-lg"
			>
				{[...Array(numOfQuestion)].map((_, index) => (
					<Col span="3" key={index}>
						<div
							className="bg-blue-400 w-10 h-10 flex justify-center items-center font-bold text-lg cursor-pointer rounded-lg"
							onClick={() => changeQuestion(index)}
						>
							{index + 1}
						</div>
					</Col>
				))}
			</Row>
		</>
	);
}
