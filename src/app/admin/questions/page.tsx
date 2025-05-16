import { findQuestionSearch } from "@/apis/QuestionService";
import QuestionTableComponent from "@/app/admin/questions/QuestionTable";
import PaginationCustomer from "@/components/Pagination";
import APIResponse from "@/types/APIResponse";
import { PagedModel } from "@/types/PagedModel";
import { QuestionResponse, QuestionSearchRequest } from "@/types/Question";

export default async function QuestionPage({
	searchParams,
}: {
	searchParams: Promise<QuestionSearchRequest>;
}) {
	const params = await searchParams;
	const res: APIResponse = await findQuestionSearch(params);
	const data: PagedModel<QuestionResponse> = res.data;
	for (const question of data.content) {
		question.key = question.id;
	}

	return (
		<>
			<QuestionTableComponent listQuestion={data.content} />
			<PaginationCustomer
				totalElements={data.page.totalElements}
				limit={data.page.size}
			/>
		</>
	);
}
