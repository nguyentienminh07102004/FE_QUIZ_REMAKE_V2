"use client";
import { findTestRatingByTestIdAndUser, ratingTest } from "@/apis/TestService";
import APIResponse from "@/types/APIResponse";
import { TestRatingResponse, TestResponse } from "@/types/Test";
import { Blockquote, Box, Flex, Grid, Text } from "@radix-ui/themes";
import { Rate } from "antd";
import { useRouter } from "next/navigation";
import { Accordion } from "radix-ui";
import React from "react";
import { CgDanger } from "react-icons/cg";
import { MdMessage } from "react-icons/md";

export default function DescriptionTest({ test }: { test: TestResponse }) {
	const [rating, setRating] = React.useState<TestRatingResponse>({
		rating: 0,
		numberOfRatings: 0,
	});
	const { refresh } = useRouter();
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res: APIResponse = await findTestRatingByTestIdAndUser(
					test.id
				);
				setRating(res.data);
			} catch {}
		};
		fetchData();
	}, [test.id]);
	const Rating = async (rate: number) => {
		await ratingTest(rate, test.id);
		refresh();
	};
	return (
		<>
			<Box width="100%" className="bg-slate-300 p-3 rounded-lg">
				<Accordion.Root
					className="rounded-md bg-mauve6 shadow-[0_2px_10px] shadow-black/5"
					type="single"
					defaultValue="item-1"
					collapsible
				>
					<Accordion.AccordionItem value="item-1">
						<Accordion.AccordionTrigger>
							<Text>Description</Text>
						</Accordion.AccordionTrigger>
						<Accordion.AccordionContent className="w-full">
							<Flex
								direction="column"
								align="baseline"
								gapY="5"
								className="mt-4"
							>
								<Grid columns="2" rows="1">
									<div className="flex items-center gap-1">
										<CgDanger /> Difficulty:
										{test.difficulty}
									</div>
									<div className="flex justify-start items-center gap-1">
										<MdMessage /> Question Number:
										{test.questions.length}
									</div>
								</Grid>
								<Blockquote weight="regular">
									{test.description}
								</Blockquote>
							</Flex>
							<div className="flex justify-end">
								<Rate
									allowHalf
									value={rating.rating || 0}
									onChange={Rating}
								/>
								<div>({rating.numberOfRatings} rates)</div>
							</div>
						</Accordion.AccordionContent>
					</Accordion.AccordionItem>
				</Accordion.Root>
			</Box>
		</>
	);
}
