"use client";
import { getUserInfo } from "@/apis/UserService";
import { UploadIcon } from "@radix-ui/react-icons";
import { Button, Col, Form, Image, Input, Row, Typography, Card, Space } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";

const { Title, Text } = Typography;

export default function ProfileComponent({ token }: { token: string }) {
	const [avatar, setAvatar] = React.useState<string>("");
	const [form] = Form.useForm();

	React.useEffect(() => {
		const fetchProfile = async () => {
			const res = await getUserInfo();
			setAvatar(res.avatar);
			form.setFieldsValue({
				id: res.id,
				fullName: res.fullName,
				email: res.email,
			});
		};
		fetchProfile();
	}, []);

	return (
		<div className="profile-page-container bg-gray-100 min-h-screen flex justify-center items-center">
			<Card className="profile-card shadow-lg" style={{ width: "80%", maxWidth: "900px", borderRadius: "12px" }}>
				<Title level={2} className="text-center mb-4">
					Profile
				</Title>
				<Row gutter={[16, 16]} justify="center" align="middle">
					<Col md={8} xs={24} className="text-center">
						<Image
							src={avatar}
							fallback="/default-avatar.jpg"
							width={150}
							height={150}
							style={{ borderRadius: "50%", border: "2px solid #ddd" }}
						/>
						<Text className="block mt-2 text-gray-500">Your Avatar</Text>
					</Col>
					<Col md={16} xs={24}>
						<Form layout="vertical" className="w-full" form={form} style={{ padding: "0 16px" }}>
							<Form.Item name="id" hidden>
								<Input />
							</Form.Item>
							<Form.Item
								name="fullName"
								label={<Text strong>Full Name</Text>}
								rules={[{ required: true, message: "Please enter your full name!" }]}
							>
								<Input placeholder="Enter your full name" />
							</Form.Item>
							<Form.Item
								name="email"
								label={<Text strong>Email</Text>}
								rules={[{ required: true, message: "Please enter your email!" }]}
							>
								<Input placeholder="Enter your email" />
							</Form.Item>
							<Form.Item label={<Text strong>Upload Avatar</Text>}>
								<Dragger
									method="PUT"
									action={process.env.NEXT_PUBLIC_BASE_URL + "/users/upload-avatar"}
									headers={{ Authorization: `Bearer ${token}` }}
									showUploadList={false}
									name="avatar"
								>
									<Button icon={<UploadIcon />}>Upload Avatar</Button>
								</Dragger>
							</Form.Item>
							<Space className="flex justify-center mt-4">
								<Button type="primary" htmlType="submit">
									Save
								</Button>
								<Button href="/" type="default">
									Return
								</Button>
							</Space>
						</Form>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
