"use client";

import { registerUserAPI } from "@/apis/UserService";
import { NotificationCustomer } from "@/components/Notification";
import { UserRegister } from "@/types/User";
import { Button, Form, Input, Select } from "antd";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
	const [form] = Form.useForm();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [contextHolder, openNotificationWithIcon] = NotificationCustomer({
		message: "Success",
		description: "Add User Success",
	});
	const registerUser = async (data: UserRegister): Promise<void> => {
		setLoading(true);
		await registerUserAPI(data);
		form.resetFields();
		setLoading(false);
		openNotificationWithIcon();
	};
	return (
		<>
			{contextHolder}
			<div className="flex flex-col justify-center items-center w-screen h-screen">
				<h1 className="text-center">REGISTER USER</h1>
				<Form onFinish={registerUser} form={form} className="w-1/2">
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
					<div className="flex justify-center items-center">
						<Button
							color="primary"
							variant="solid"
							htmlType="submit"
							loading={loading}
						>
							Add User
						</Button>
					</div>
				</Form>
				<div className="mt-2 text-blue-400">
					<Link href="/login">You haved account? Login</Link>
				</div>
			</div>
		</>
	);
}
