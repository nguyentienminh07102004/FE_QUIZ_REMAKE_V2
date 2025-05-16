"use client";
import { findAllTestsHasSameCategory } from "@/apis/TestService";
import TestItem from "@/components/TestItem";
import APIResponse from "@/types/APIResponse";
import { TestResponse } from "@/types/Test";
import React from "react";

export const TestListHasSameCategory = ({
	categoryCode,
}: {
	categoryCode: string;
}) => {
	const [testList, setTestList] = React.useState<TestResponse[]>([]);
	React.useEffect(() => {
		const fetchData = async () => {
			const res: APIResponse = await findAllTestsHasSameCategory(
				categoryCode
			);
			setTestList(res.data);
		};
		fetchData();
	}, [categoryCode]);
	return (
		<>
			{testList.map((test) => (
				<TestItem test={test} key={test.id} width="100%" />
			))}
		</>
	);
};
