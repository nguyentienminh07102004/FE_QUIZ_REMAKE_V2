"use client";
import { AnswerSelectedStatus } from "@/types/TestResult";
import { Card } from "antd";

export default function Description({
	answerSelected,
}: {
	answerSelected: {
		answerIds: string[];
		questionId: string;
		status: AnswerSelectedStatus;
	}[];
}) {
	return (
		<>
			<Card
				title="Default size card"
				extra={<a href="#">More</a>}
				style={{ width: 300 }}
			>
				<p>
					Number of correct answers:{" "}
					{
						answerSelected.filter(
							(ans) => ans.status.toString() === "CORRECT"
						).length
					}
				</p>
				<p>
					Number of incorrect answers:{" "}
					{
						answerSelected.filter(
							(ans) => ans.status.toString() === "INCORRECT"
						).length
					}
				</p>
				<p>
					Number of not answer answers:{" "}
					{
						answerSelected.filter(
							(ans) => ans.status.toString() === "NOT_ANSWERED"
						).length
					}
				</p>
			</Card>
		</>
	);
}
