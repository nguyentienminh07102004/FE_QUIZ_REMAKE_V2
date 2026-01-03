"use client";
import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { ForgotPasswordService, ResetPasswordService } from "@/apis/UserService";

const ForgotPassword: React.FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isResetModalVisible, setIsResetModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleResetCancel = () => {
		setIsResetModalVisible(false);
	};

	const onFinish = async ({ email }: { email: string }) => {
		await ForgotPasswordService(email);
		message.success("Verification code sent to your email!");
		setIsModalVisible(false);
		setIsResetModalVisible(true);
	};

	const onResetFinish = async ({ code, newPassword, confirmPassword }: { code: string; newPassword: string; confirmPassword: string }) => {
		if (newPassword !== confirmPassword) {
			message.error("Passwords do not match!");
			return;
		}
        await ResetPasswordService(code, newPassword, confirmPassword);
		message.success("Password reset successfully!");
		setIsResetModalVisible(false);
	};

	return (
		<div>
			<Button type="link" onClick={showModal}>
				Forgot Password?
			</Button>
			<Modal title="Forgot Password" open={isModalVisible} onCancel={handleCancel} footer={false}>
				<Form name="forgot_password" onFinish={onFinish} layout="vertical">
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Please input your email!" },
							{ type: "email", message: "Please enter a valid email!" },
						]}
					>
						<Input placeholder="Enter your email" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal title="Reset Password" open={isResetModalVisible} onCancel={handleResetCancel} footer={false}>
				<Form name="reset_password" onFinish={onResetFinish} layout="vertical">
					<Form.Item label="Verification Code" name="code" rules={[{ required: true, message: "Please input the verification code!" }]}>
						<Input placeholder="Enter verification code" />
					</Form.Item>
					<Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: "Please input your new password!" }]}>
						<Input.Password placeholder="Enter new password" />
					</Form.Item>
					<Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: "Please confirm your password!" }]}>
						<Input.Password placeholder="Confirm new password" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Reset Password
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ForgotPassword;
