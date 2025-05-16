"use client";

import { finishTestResult } from "@/apis/TestResultService";
import { useRouter } from "next/navigation";

export default function ButtonSubmit({
	id,
}: {
	id: string;
}) {
	const {replace} = useRouter();
	const submitTest = async () => {
		
		await finishTestResult({
			finishDate: new Date(),
			id: id,
		});
		replace(`/test-result/${id}/result`);
	};
	return (
		<>
			<button
				className="bg-green-400 px-96 py-3 rounded-lg cursor-pointer font-bold text-lg"
				onClick={submitTest}
			>
				Submit
			</button>
		</>
	);
}
