import { findAllCategory } from "@/apis/CategoryService";
import APIResponse from "@/types/APIResponse";
import { CategoryResponse } from "@/types/Category";
import { PagedModel } from "@/types/PagedModel";
import { SelectProps } from "antd";
import QuestionUpdateForm from "./FormQuestion";
import { QuestionResponse } from "@/types/Question";
import { findQuestionSearch } from "@/apis/QuestionService";

export default async function UpdateQuestion({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const questions: PagedModel<QuestionResponse> = (
		await findQuestionSearch({ id })
	).data;
	const res: APIResponse = await findAllCategory({});
	const data: PagedModel<CategoryResponse> = res.data;
	const list: SelectProps["options"] = [];
	data.content.forEach((category) => {
		list.push({ label: category.name, value: category.code });
	});
	return (
		<>
			<QuestionUpdateForm
				listCategory={list}
				question={{
					...questions.content[0],
					categoryCode: questions.content[0].category.code
				}}
			/>
		</>
	);
}
