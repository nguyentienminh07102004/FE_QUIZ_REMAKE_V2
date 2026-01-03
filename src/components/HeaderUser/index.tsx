"use client";

import apis from "@/apis/base";
import { logoutService } from "@/apis/UserService";
import SearchInput from "@/components/SearchInput";
import { Avatar } from "@radix-ui/themes";
import { Button, Dropdown, Form, Input, message, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function HeaderUser(): React.ReactElement {
	const router = useRouter();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const logout = async () => {
		await logoutService();
		router.replace("/login");
	};
	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex items-center gap-4">
				<Avatar src="/quiz.jpg" fallback="Q" size="4" radius="full" />
				<span className="text-xl font-bold text-green-600">QUIZ</span>
			</div>
			<div className="flex-1 px-8">
				<SearchInput name="title" />
			</div>
			<div>
				<Dropdown
					placement="bottom"
					arrow
					menu={{
						items: [
							{
								key: "profile",
								label: <Link href="/profile">Profile</Link>,
							},
							{
								key: "Test Details",
								label: (
									<Link href="/test-result">Test Details</Link>
								),
							},
							{
								key: "logout",
								label: "Logout",
								onClick: async () => await logout(),
							},
						],
					}}
				>
					<Avatar
						src="/default-avatar.jpg"
						className="cursor-pointer"
						size="4"
						fallback="A"
						radius="full"
					/>
				</Dropdown>
			</div>
		</div>
	);
}
