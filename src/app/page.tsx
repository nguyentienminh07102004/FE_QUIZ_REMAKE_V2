import { findAll } from "@/apis/TestService";
import HeaderUser from "@/components/HeaderUser";
import PaginationCustomer from "@/components/Pagination";
import SiderUser from "@/components/SiderUser";
import TestItem from "@/components/TestItem";
import APIResponse from "@/types/APIResponse";
import { PagedModel } from "@/types/PagedModel";
import { TestResponse, TestSearchRequest } from "@/types/Test";
import React from "react";

export default async function Home(props: {
	searchParams: Promise<TestSearchRequest>;
}): Promise<React.ReactElement> {
	const params = await props.searchParams;
	const res: APIResponse = await findAll(params);
	const pageTestResponse: PagedModel<TestResponse> = res.data;
	return (
		<main className="min-h-screen bg-slate-50 p-4 sm:p-8">
			<div className="mx-auto max-w-7xl">
				<header className="rounded-t-lg bg-violet-100 p-4 shadow-sm">
					<HeaderUser />
				</header>
				<div className="rounded-b-lg bg-white p-6 shadow-sm">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
						<aside className="lg:col-span-1">
							<SiderUser />
						</aside>
						<div className="lg:col-span-3">
							<div className="grid grid-cols-1 content-start gap-6 min-h-[500px] md:grid-cols-2 xl:grid-cols-3">
								{pageTestResponse.content.map((test) => (
									<TestItem test={test} key={test.id} />
								))}
							</div>
							<div className="mt-8 flex justify-center">
								<PaginationCustomer
									limit={pageTestResponse.page.size}
									totalElements={
										pageTestResponse.page.totalElements
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
