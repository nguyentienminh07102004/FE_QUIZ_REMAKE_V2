"use client";

import { findAllCategory } from "@/apis/CategoryService";
import { findQuestionSearch } from "@/apis/QuestionService";
import { createTestService } from "@/apis/TestService";
import GetDifficulty from "@/commons/utils/GetDifficulty";
import { NotificationCustomer } from "@/components/Notification";
import APIResponse from "@/types/APIResponse";
import { CategoryResponse } from "@/types/Category";
import { PagedModel } from "@/types/PagedModel";
import { QuestionResponse } from "@/types/Question";
import { TestRequest } from "@/types/Test";
import { Button, Form, Input, Select } from "antd";
import { BaseOptionType } from "antd/es/select";
import React from "react";

export default function FormCreateTestComponent() {
	const [category, setCategory] = React.useState<BaseOptionType[]>([]);
	const [questionList, setQuestionList] = React.useState<QuestionResponse[]>([]);
	const [form] = Form.useForm();
	const [contextHolder, openNotificationWithIcon] = NotificationCustomer({
		message: "Create Test Success",
		description: "Create test successfully",
		type: "success",
	});
	React.useEffect(() => {
		const fetchData = async () => {
			const res: APIResponse = await findAllCategory({});
			const data: PagedModel<CategoryResponse> = res.data;
			setCategory(
				data.content.map((category) => ({
					label: category.name,
					value: category.code,
				}))
			);
		};
		fetchData();
	}, []);
	const hanldeChangeCategory = async (value: string) => {
		const res = await findQuestionSearch({ categoryCode: value });
		const data: PagedModel<QuestionResponse> = res.data;
		setQuestionList(data.content);
	};
	const createTest = async (values: TestRequest) => {
		await createTestService(values);
		openNotificationWithIcon();
		form.resetFields();
	};

	return (
		<>
			{contextHolder}
			<h1 className="text-center">CREATE TEST</h1>
			<div className="flex justify-center h-full items-center w-full">
				<Form className="w-1/2" title="CREATE TEST" onFinish={createTest} form={form}>
					<Form.Item name="title">
						<Input placeholder="TITLE..." />
					</Form.Item>
					<Form.Item name="description">
						<Input.TextArea rows={7} placeholder="DESCRIPTION..." />
					</Form.Item>
					<Form.Item name="difficulty" initialValue="EASY">
						<Select options={GetDifficulty()} />
					</Form.Item>
					<Form.Item name="categoryCode">
						<Select options={category} onChange={hanldeChangeCategory} />
					</Form.Item>
					<Form.Item name="questionIds">
						<Select
							mode="multiple"
							placeholder="SELECT QUESTION..."
							options={questionList.map((question) => ({
								label: question.title,
								value: question.id,
							}))}
						/>
					</Form.Item>
					<div className="flex justify-center items-center">
						<Button htmlType="submit" color="primary" variant="filled">
							Create Test
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
}
