"use client";
import { TestResponse } from "@/types/Test";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function TestItem({
	test,
	width,
}: {
	test: TestResponse;
	width?: string;
}) {
	const { push } = useRouter();
	return (
		<>
			<Box
				height="100px"
				width={width || "49%"}
				className="cursor-pointer"
				onClick={() => push(`/tests/${test.id}`)}
			>
				<Card>
					<Flex gap="3" align="center">
						<Avatar
							size="3"
							src="/quiz.jpg"
							radius="full"
							fallback="T"
						/>
						<Box>
							<Text as="div" size="2" weight="bold">
								{test.title}
							</Text>
							<Text as="div" size="2" color="gray">
								{test.description}
							</Text>
						</Box>
					</Flex>
				</Card>
			</Box>
		</>
	);
}
