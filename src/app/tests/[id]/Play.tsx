"use client";
import { startTest } from "@/apis/TestResultService";
import APIResponse from "@/types/APIResponse";
import { TestResponse } from "@/types/Test";
import { PlayIcon, Share1Icon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import { Rate } from "antd";
import { useRouter } from "next/navigation";

export default function PlayTest({ test }: { test: TestResponse }) {
	const { replace } = useRouter();
	const playTest = async () => {
		const res: APIResponse = await startTest({testId: test.id, startedDate: new Date()});
		const id: string = res.data;
		replace(`/test-result/${id}`);
	}
	return (
		<>
			<Box width="100%" className="bg-slate-300 p-3 rounded-lg">
				<Flex justify="between" align="end" gapX="3">
					<Avatar
						size="9"
						src="/quiz.jpg"
						radius="medium"
						fallback="T"
					/>
					<Flex direction="column" gapY="4">
						<Text weight="bold" size="4">
							{test.title}
						</Text>
						<Button className="cursor-pointer" onClick={playTest}>
							<PlayIcon />
							Play
						</Button>
						<Button className="cursor-pointer">
							<Share1Icon />
							Share
						</Button>
						<div>
							<Rate allowHalf defaultValue={test.testRating?.rating || 0} disabled /> ({test.testRating?.numberOfRatings || 0} rates)
						</div>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
