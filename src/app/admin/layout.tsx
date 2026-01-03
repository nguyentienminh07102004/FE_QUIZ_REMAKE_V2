import { JWTDecoder } from "@/types/Jwt";
import { Dropdown, Image, Layout, Menu, MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { jwtDecode } from "jwt-decode";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GrDocumentTest } from "react-icons/gr";
import {
	MdDashboard,
	MdOutlineCategory,
	MdOutlineQuestionMark
} from "react-icons/md";
import HeaderComponent from "./HeaderComponent";
import GetToken from "@/commons/utils/GetToken";
import { FaRegUser } from "react-icons/fa6";

export default async function DashboardAdmin({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const header = await headers();
	const cookieStorage = await cookies();
	const token = cookieStorage.get("token");
	if (!(token?.value)) {
		redirect('/login')
	}
	const jwtDecoder: JWTDecoder = jwtDecode(token?.value || "");
	if (!jwtDecoder.scope.includes("ADMIN")) {
		redirect('/login')
	}
	const menuItems: MenuProps["items"] = [
		{
			key: "/admin/dashboard",
			label: <Link href="/admin/dashboard">Dashboard</Link>,
			icon: <MdDashboard />,
		},
		{
			key: "/admin/categories",
			label: <Link href="/admin/categories">Category</Link>,
			icon: <MdOutlineCategory />,
		},
		{
			key: "/admin/questions",
			label: <Link href="/admin/questions">Question</Link>,
			icon: <MdOutlineQuestionMark />,
		},
		{
			key: "/admin/tests",
			label: <Link href="/admin/tests">Test</Link>,
			icon: <GrDocumentTest />,
		},
		{
			key: "/admin/user-test-results",
			label: <Link href="/admin/user-test-results">User Test Results</Link>,
			icon: <GrDocumentTest />,
		},
	];
	if (jwtDecoder.scope.includes("ADMIN")) {
		menuItems.push({
			key: "/admin/users",
			label: <Link href="/admin/users">User</Link>,
			icon: <FaRegUser />,
		})
	}
	return (
		<>
			<Layout hasSider>
				<Sider
					className="overflow-auto h-screen sticky start-0 top-0 bottom-0"
					theme="light"
					breakpoint="md"
					collapsible
				>
					<Image src="/quiz.jpg" alt="Logo" />
					<Menu
						mode="inline"
						items={menuItems}
						defaultSelectedKeys={[
							header.get("next-url") || "/admin/dashboard",
						]}
					/>
				</Sider>
				<Layout>
					<Header className="overflow-auto sticky top-0 left-0 start-0 z-50">
						<Dropdown className="flex items-center justify-end w-full">
							<HeaderComponent token={token?.value} />
						</Dropdown>
					</Header>
					<Content className="m-5 bg-white p-2">{children}</Content>
				</Layout>
			</Layout>
		</>
	);
}
