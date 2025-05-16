"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SearchInput({
	name,
}: {
	name: string;
}): React.ReactElement {
	const searchParams = useSearchParams();
	const pathName: string = usePathname();
	const { push } = useRouter();
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const params = new URLSearchParams(searchParams);
		if (e.target.value) {
			params.set(e.target.name, e.target.value);
		} else {
			params.delete(e.target.name);
		}
		if (params.get('page')) {
			params.set('page', '1');
		}
		push(`${pathName}?${params.toString()}`);
	};
	return (
		<>
			<TextField.Root
				placeholder="Search title"
				size="3"
				radius="large"
				className="flex-1 mx-5 h-9"
				onChange={handleSearch}
				defaultValue={searchParams.get('title') || ""}
				name={name}
			>
				<TextField.Slot>
					<MagnifyingGlassIcon height="16" width="16" />
				</TextField.Slot>
			</TextField.Root>
		</>
	);
}
