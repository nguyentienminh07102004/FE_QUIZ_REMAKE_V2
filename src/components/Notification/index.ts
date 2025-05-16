"use client";
import { notification } from "antd";
import React from "react";
export type NotificationType = "success" | "info" | "warning" | "error";

export const NotificationCustomer = ({
	message,
	description,
	type = "success"
}: {
	message: string;
	description: string;
	type?: NotificationType
}): [React.ReactElement, () => void] => {
	
	const [api, contextHolder] = notification.useNotification();

	const openNotificationWithIcon = () => {
		api[type]({
			message: message,
			description: description,
			duration: 5,
			pauseOnHover: false,
			placement: "topRight",
			showProgress: true
		});
	};
	return [contextHolder, openNotificationWithIcon];
};
