"use client";
import { findAnswerSelectedOfTestResult, saveAnswerSelectOfTestResult } from "@/apis/TestResultService";
import { AnswerResponse } from "@/types/Answer";
import { Callout, Checkbox } from "@radix-ui/themes";
import React from "react";

export default function AnswerComponent({
	questionId,
	answer,
	testResultId
}: {
	questionId: string;
	answer: AnswerResponse;
	testResultId: string
}) {
	const [listAnswerSelected, setListAnswerSelected] = React.useState<string[]>([]);
	const [reload, setReload] = React.useState<boolean>(false);
	React.useEffect(() => {
		const fetchData = async () => {
			const res = await findAnswerSelectedOfTestResult(testResultId, questionId);
			setListAnswerSelected(res.data);
		}
		fetchData();
	}, [testResultId, questionId, reload]);
	
	const saveAnswerSelected = async () => {
		await saveAnswerSelectOfTestResult(testResultId, questionId, answer.id);
		setReload(!reload);
	}
	return (
		<>
			<Callout.Root
				className="cursor-pointer"
				onClick={saveAnswerSelected}
			>
				<Callout.Icon>
					<Checkbox checked={listAnswerSelected.includes(answer.id)} />
				</Callout.Icon>
				<Callout.Text highContrast size="3">
					<span className="font-medium text-xl text-black text-center w-full">
						{answer.content}
					</span>
				</Callout.Text>
			</Callout.Root>
		</>
	);
}
