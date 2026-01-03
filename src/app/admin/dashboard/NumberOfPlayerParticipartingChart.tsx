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
			<ResponsiveContainer width="100%" height={400}>
				<BarChart data={data} layout="vertical">
					<XAxis
						type="number"
						dataKey="numberOfPlayers"
						name="Number of Participants"
						allowDecimals={false}
					/>
					<YAxis
						type="category"
						dataKey="test"
						width={100}
						tickFormatter={(id: string) => id.length > 10 ? id.substring(0, 10) + "..." : id}
					/>
					<Bar dataKey="numberOfPlayers" fill="#4caf50" barSize={20}>
						<LabelList
							dataKey="numberOfPlayers"
							position="insideRight"
							style={{ fill: "#fff", fontSize: 12 }}
						/>
					</Bar>
					<Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}
