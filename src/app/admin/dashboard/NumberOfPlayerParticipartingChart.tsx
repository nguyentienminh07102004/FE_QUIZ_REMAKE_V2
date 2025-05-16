"use client";
import { numberOfPlayerParticipating } from "@/apis/TestResultService";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	LabelList,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
interface NumberOfPlayerParticipatingTestResponse {
	test: string;
	numberOfPlayers: number;
}
export default function NumberOfPlayerParticipatingChart({
	limit = 10,
}: {
	limit?: number;
}) {
	const [data, setData] = useState<NumberOfPlayerParticipatingTestResponse[]>(
		[]
	);
	useEffect(() => {
		const fetchData = async () => {
			const res = await numberOfPlayerParticipating(limit);
			setData(res.data);
		};
		fetchData();
	}, [limit]);
	return (
		<>
			<ResponsiveContainer width="100%" height={250}>
				<BarChart data={data}>
					<XAxis
						dataKey="test"
						tickFormatter={(id: string) => id.substring(0, 5) + "..."}
					/>
					<YAxis
						dataKey="numberOfPlayers"
						name="number of participants"
					/>
					<Bar dataKey="numberOfPlayers" fill="#82ca9d">
						<LabelList
							dataKey="test"
							formatter={(testId: string) =>
								testId.substring(0, 8) + "..."
							}
							position="inside"
							angle={-45}
						/>
					</Bar>
					<Tooltip cursor={true} />
				</BarChart>
			</ResponsiveContainer>
			<h1 className="text-center text-2xl">
				Top {limit} bài thi làm nhiều nhất
			</h1>
		</>
	);
}
