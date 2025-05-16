"use client";

import { changeUserStatusService } from "@/apis/UserService";
import AddUser from "@/app/admin/users/AddUser";
import UserDetailComponent from "@/app/admin/users/UserDetailComponent";
import { UserResponse, UserStatus } from "@/types/User";
import { UserOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Col,
	Row,
	Table,
	TableColumnsType,
	Tag
} from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function TableUserComponent({
	listUser,
}: {
	listUser: UserResponse[];
}) {
	const [user, setUser] = React.useState<UserResponse>(listUser[0]);
	const [isOpenAddUser, setOpenAddUser] = React.useState<boolean>(false);
	const { refresh } = useRouter();
	const changeUserStatus = React.useCallback(async (id: string) => {
		try {
			const res = await changeUserStatusService(id);
			console.log(res);
		} catch (err) {
			console.log(err);
		} finally {
			refresh();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const columns: TableColumnsType<UserResponse> = [
		{
			key: "avatar",
			dataIndex: "avatar",
			render: (avatar: string | null) => (
				<Avatar src={avatar} icon={<UserOutlined />} />
			),
			responsive: ["sm"],
		},
		{
			key: "FullName",
			title: "Full Name",
			dataIndex: "fullName",
			responsive: ["md"],
		},
		{
			key: "Status",
			title: "Status",
			dataIndex: "status",
			render: (status: UserStatus, user: UserResponse) => (
				<Tag
					color={status === "ACTIVE" ? "green" : "red"}
					className="cursor-pointer"
					onClick={async () => await changeUserStatus(user.id)}
				>
					{status}
				</Tag>
			),
		},
		{
			key: "Email",
			title: "Email",
			dataIndex: "email",
		},
	];
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col lg={16} xs={24}>
					<div className=" flex justify-end items-center mb-4">
						<Button icon={<IoMdAdd />} className="bg-green-500" onClick={() => setOpenAddUser(true)}>
							New User
						</Button>
					</div>
					<Table<UserResponse>
						columns={columns}
						dataSource={listUser}
						pagination={false}
						bordered
						className="cursor-pointer"
						onRow={(record: UserResponse) => {
							return {
								onClick: () => {
									setUser(record);
								},
							};
						}}
					/>
				</Col>
				<Col lg={7} xs={24} className="border-l-2 border-gray-200">
					<UserDetailComponent user={user} />
				</Col>
			</Row>
			<AddUser isOpenAddUser={isOpenAddUser} setOpenAddUser={setOpenAddUser} />
		</>
	);
}
