"use client";
import { CategoryResponse } from "@/types/Category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryItem({
	category,
}: {
	category: CategoryResponse;
}) {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { push } = useRouter();
	const searchCategory = () => {
		const params = new URLSearchParams(searchParams);
		params.set("category", category.code);
		if (params.get("page")) {
			params.set("page", "1");
		}
		push(`${pathName}?${params.toString()}`);
	};
	return (
		<>
			<div
				className="w-32 h-12 mb-2 bg-[#BDBDDB] rounded-lg flex justify-center items-center cursor-pointer"
				onClick={searchCategory}
			>
				<span className="font-[500] text-md">{category.name}</span>
			</div>
		</>
	);
}
