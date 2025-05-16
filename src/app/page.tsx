import { findAll } from "@/apis/TestService";
import HeaderUser from "@/components/HeaderUser";
import PaginationCustomer from "@/components/Pagination";
import SiderUser from "@/components/SiderUser";
import TestItem from "@/components/TestItem";
import APIResponse from "@/types/APIResponse";
import { PagedModel } from "@/types/PagedModel";
import { TestResponse, TestSearchRequest } from "@/types/Test";
import { Container } from "@radix-ui/themes";
import React from "react";

export default async function Home(props: {
	searchParams: Promise<TestSearchRequest>;
}): Promise<React.ReactElement> {
	const params = await props.searchParams;
	const res: APIResponse = await findAll(params);
	const pageTestResponse: PagedModel<TestResponse> = res.data;
	return (
		<>
			<Container size="4" className="p-3 relative">
				<HeaderUser />
			</Container>
			<div className="mx-auto max-w-[62rem] flex gap-6 flex-wrap">
				<SiderUser />
				<div className="flex-1">
					<div className="flex justify-between items-center flex-wrap overflow-auto min-h-[500px]">
						{pageTestResponse.content.map((test) => (
							<TestItem test={test} key={test.id} />
						))}
					</div>
					<div className="mx-auto max-w-[63rem]">
						<PaginationCustomer
							limit={pageTestResponse.page.size}
							totalElements={pageTestResponse.page.totalElements}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
