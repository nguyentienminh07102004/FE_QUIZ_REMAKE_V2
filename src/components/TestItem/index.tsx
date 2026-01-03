"use client";
import { TestResponse } from "@/types/Test";
import { Avatar, Box, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function TestItem({
	test,
}: {
	test: TestResponse;
}) {
	const { push } = useRouter();
	return (
		<div
			className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
			onClick={() => push(`/tests/${test.id}`)}
		>
			<Avatar size="3" src="/quiz.jpg" radius="full" fallback="T" />
			<Box>
				<Text as="div" size="2" weight="bold">
					{test.title}
				</Text>
				<Text as="div" size="2" color="gray">
					{test.description}
				</Text>
			</Box>
		</div>
	);
}
