"use client";
import { getUserInfo } from "@/apis/UserService";
import { UploadIcon } from "@radix-ui/react-icons";
import { Button, Col, Form, Image, Input, Row } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";

export default function ProfilePage() {
    const [avatar, setAvatar] = React.useState<string>("");
    const [form] = Form.useForm();
	React.useEffect(() => {
		const fetchProfile = async () => {
			const res = await getUserInfo();
            setAvatar(res.avatar)
			form.setFieldsValue({
				id: res.id,
				fullName: res.fullName,
				email: res.email,
			});
		};
        fetchProfile();
	}, []);
	return (
		<>
			<h1 className="text-center">PROFILE</h1>
			<Row justify="center" className="mx-5 h-screen">
				<Col md={8} xs={24} className="text-center">
					<Image src={avatar} fallback="/default-avatar.jpg" />
				</Col>
				<Col md={16} xs={24} className="text-center px-5 flex flex-col justify-center items-center h-full">
					<Form layout="vertical" className="w-full" form={form}>
						<Form.Item name="id" hidden>
							<Input />
						</Form.Item>
						<Form.Item name="fullName" label="Full Name">
							<Input />
						</Form.Item>
						<Form.Item name="email" label="Email">
							<Input />
						</Form.Item>
						<Dragger>
							<Button icon={<UploadIcon />}>Upload Avatar</Button>
						</Dragger>
						<div className="flex justify-evenly items-center">
							<Button type="primary" htmlType="submit" className="mt-4">
								Save
							</Button>
                            <Button href="/" className="mt-4 ml-2" type="primary">
                                Return
                            </Button>
						</div>
					</Form>
				</Col>
			</Row>
		</>
	);
}
