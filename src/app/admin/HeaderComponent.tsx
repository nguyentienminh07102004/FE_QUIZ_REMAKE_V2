"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Form, Input, message, Modal } from "antd";
import apis from "@/apis/base";
import { jwtDecode } from "jwt-decode";
import { JWTDecoder } from "@/types/Jwt";

const HeaderComponent = ({ token }: { token: string }) => {
	const [avatar, setAvatar] = useState("/default-avatar.jpg");
	const router = useRouter();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { scope } = jwtDecode<JWTDecoder>(token);
	useEffect(() => {
		const fetchUserAvatar = async () => {
			try {
				const response = await axios.get("/api/user/avatar");
				if (response.data?.avatar) {
					setAvatar(response.data.avatar);
				}
			} catch (error) {
				console.error("Failed to fetch user avatar:", error);
			}
		};

		fetchUserAvatar();
	}, []);

	const handleProfileRedirect = () => {
		router.push("/profile");
	};
	const onFinish = async () => {
		const res = await apis.post(
			"/users/change-admin",
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		setIsModalVisible(true);
	};
	const handleChangeAdmin = async (values: { email: string; code: string }) => {
		await apis.put("/users/change-admin", values, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
	};
	return (
		<>
			<header className="header flex justify-evenly items-center">
				<img
					src={avatar}
					alt="User Avatar"
					className="user-avatar"
					onClick={handleProfileRedirect}
					style={{ cursor: "pointer", borderRadius: "50%", width: "50px", height: "50px" }}
				/>
				{scope.includes("ADMIN") && <Button onClick={onFinish}>Change Admin</Button>}
			</header>
			<Modal title="Enter Email & Code" open={isModalVisible} footer={null}>
				<Form name="email_code_form" onFinish={handleChangeAdmin} layout="vertical">
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your email!",
							},
							{
								type: "email",
								message: "Please enter a valid email!",
							},
						]}
					>
						<Input placeholder="Enter your email" />
					</Form.Item>
					<Form.Item
						label="Code"
						name="code"
						rules={[
							{
								required: true,
								message: "Please input your code!",
							},
						]}
					>
						<Input placeholder="Enter your code" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default HeaderComponent;
