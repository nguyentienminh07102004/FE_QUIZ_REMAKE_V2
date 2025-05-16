"use client";

import { logoutService } from "@/apis/UserService";
import SearchInput from "@/components/SearchInput";
import { Avatar } from "@radix-ui/themes";
import { Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function HeaderUser(): React.ReactElement {
	const router = useRouter();
	const  logout = async () => {
		await logoutService();
		router.replace('/login');
	}
	return (
		<>
			<div className="flex justify-between items-center bg-[#BDBDDB] p-2 rounded-lg w-full">
				<div className="flex items-center cursor-pointer">
					<Image src="/quiz.jpg" alt="Logo" width="100" height="100" />
					<h1 className="text-xl font-black text-green-500 ms-2">QUIZ</h1>
				</div>
				<SearchInput name="title" />
				<div>
					<Dropdown placement="bottomCenter" arrow menu={{items: [
						{
							key: "profile",
							label: <Link href="/profile">Profile</Link>
						},
						{
							key: "logout",
							label: "Logout",
							onClick: async () => await logout()
						}
					]}}>
						<Avatar src="/default-avatar.jpg" className="cursor-pointer" size="4" fallback="/default-avatar.jpg" />
					</Dropdown>
				</div>
			</div>
		</>
	);
}
