"use client";

import { numberOfPlayerParticipatingForTime } from "@/apis/TestResultService";
import { useEffect, useState } from "react";
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

interface NumberOfPlayerParticipatingTestForTime {
	date: string;
	numberOfPlayers: number;
}
export default function NumberOfPlayerParticipatingForTimeChart() {
	const [data, setData] = useState<NumberOfPlayerParticipatingTestForTime[]>(
		[]
	);
	useEffect(() => {
		const fetchData = async () => {
			const res = await numberOfPlayerParticipatingForTime();
			setData(res.data);
		};
		fetchData();
	}, []);
	return (
		<>
			<ResponsiveContainer width="100%" height={250}>
				<AreaChart data={data}>
					<defs>
						<linearGradient
							id="colorUv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#8884d8"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="#8884d8"
								stopOpacity={0}
							/>
						</linearGradient>
						<linearGradient
							id="colorPv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#82ca9d"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="#82ca9d"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<XAxis dataKey="date" />
					<YAxis dataKey="numberOfPlayers" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="numberOfPlayers"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#colorUv)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</>
	);
}
