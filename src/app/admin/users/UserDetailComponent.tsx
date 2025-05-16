/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { uploadAvatar } from "@/apis/UserService";
import APIResponse from "@/types/APIResponse";
import { UserResponse } from "@/types/User";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Image, Input, Row, Tag, Upload } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

export default function UserDetailComponent({ user }: { user: UserResponse }) {
	const [disable, setDisable] = React.useState<boolean>(true);
	const { refresh } = useRouter();
	return (
		<>
			<div className="flex justify-between items-center">
				<div className="flex justify-between items-center gap-3">
					<h1 className="text-xl">User Information</h1>
					<Tag color={user.status === "ACTIVE" ? "green" : "red"}>
						{user.status}
					</Tag>
				</div>
				<div onClick={() => setDisable(!disable)}>
					<FaPen className="cursor-pointer" />
				</div>
			</div>
			<Divider />
			<div className="flex justify-center flex-col items-center">
				{disable ? (
					<Image
						src={user.avatar}
						width="200"
						alt=""
						height="200"
						fallback="/default-avatar.jpg"
						
					></Image>
				) : (
					<Upload
						customRequest={async (options) => {
							const { file, onSuccess, onError } = options;
							try {
								const formData: FormData = new FormData();
								formData.append("avatar", file);
								formData.append("email", user.email);
								const res: APIResponse = await uploadAvatar(
									formData
								);
								onSuccess!(res, file);
								refresh();
							} catch(err) {
								onError
							}
						}}
					>
						<Button icon={<UploadOutlined />}>
							Click to upload
						</Button>
					</Upload>
				)}
				<Input
					type="text"
					disabled={disable}
					className="my-5 border-b-2 border-black pb-2"
					value={user.fullName}
					size="small"
				/>
				<Row
					className="w-full mb-6"
					align="middle"
					justify="center"
					gutter={[20, 20]}
				>
					<Col
						xs={6}
						className="flex justify-center items-center gap-3 text-md"
					>
						<CiMail />
						Email:
					</Col>
					<Col xs={16} className="text-md">
						{user.email}
					</Col>
				</Row>
				<Row className="w-full" gutter={[20, 20]}>
					<Col
						xs={6}
						className="flex justify-center items-center gap-3 text-md"
					>
						<FaRegUserCircle className="text-md" />
						Role:
					</Col>
					<Col xs={18} className="text-md">
						{user.role.name}
					</Col>
				</Row>
			</div>
		</>
	);
}
