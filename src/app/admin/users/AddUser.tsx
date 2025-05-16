import { registerUserAPI } from "@/apis/UserService";
import { NotificationCustomer } from "@/components/Notification";
import { UserRegister } from "@/types/User";
import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

export default function AddUser({
	isOpenAddUser,
	setOpenAddUser,
}: {
	isOpenAddUser: boolean;
	setOpenAddUser: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [form] = Form.useForm();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [contextHolder, openNotificationWithIcon] = NotificationCustomer({
		message: "Success",
		description: "Add User Success",
	});
	const registerUser = async (data: UserRegister) => {
		setLoading(true);
		await registerUserAPI(data);
		form.resetFields();
		setLoading(false);
		openNotificationWithIcon();
	};
	return (
		<>
			{contextHolder}
			<Modal
				title="Add User"
				open={isOpenAddUser}
				onCancel={() => setOpenAddUser(false)}
				footer={false}
			>
				<Form onFinish={registerUser} form={form}>
					<Form.Item
						name="email"
						rules={[
							{ required: true, message: "Field is required!" },
						]}
					>
						<Input type="email" placeholder="Email..." />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{ required: true, message: "Field is required!" },
							{ min: 8, message: "Password length is 8+" },
						]}
					>
						<Input.Password placeholder="Password..." />
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						rules={[
							{ required: true, message: "Field is required!" },
						]}
					>
						<Input.Password placeholder="Confirm Password..." />
					</Form.Item>
					<Form.Item
						name="fullName"
						rules={[
							{ required: true, message: "Field is required!" },
						]}
					>
						<Input placeholder="Full Name..." />
					</Form.Item>
					<Form.Item name="status" initialValue="ACTIVE">
						<Select
							options={[
								{ value: "ACTIVE", label: "ACTIVE" },
								{ value: "INACTIVE", label: "INACTIVE" },
							]}
						/>
					</Form.Item>
					<Form.Item name="roleCode" initialValue="USER">
						<Select
							options={[
								{ value: "USER", label: "USER" },
								{ value: "ADMIN", label: "ADMIN" },
							]}
						/>
					</Form.Item>
					<div className="flex justify-center items-center">
						<Button color="primary" htmlType="submit" loading={loading}>
							Add User
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
}
