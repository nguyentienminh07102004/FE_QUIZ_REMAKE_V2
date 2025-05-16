"use client";

import { NotificationCustomer } from "@/components/Notification";
import TextEditorComponent from "@/components/TextEditor/TextEditorComponent";
import { QuestionRequest, QuestionResponse } from "@/types/Question";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, SelectProps, Switch } from "antd";
import { useForm } from "antd/es/form/Form";

export default function QuestionUpdateForm({
	listCategory,
	question,
}: {
	listCategory: SelectProps["options"];
	question: QuestionRequest;
}) {
	const [form] = useForm();
	const [contextHolder, openNotificationWithIcon] = NotificationCustomer({
		message: "Success",
		description: "Success",
	});
	const submitForm = async (data: QuestionRequest) => {
        console.log(data);
    };
	return (
		<>
			{contextHolder}
			<Form
				onFinish={submitForm}
				className="flex justify-center items-center w-full h-full flex-col text-center"
				size="large"
				title="New Question"
				labelCol={{ lg: 4, xs: 24 }}
				wrapperCol={{ lg: 20, xs: 24 }}
				form={form}
				initialValues={question}
			>
				<Form.Item
					name="title"
					label="Title"
					className="md:w-2/3 xs:w-full"
					rules={[
						{
							required: true,
							message: "Question title not null or empty",
						},
					]}
				>
					<Input type="text" />
				</Form.Item>
				<Form.Item
					name="categoryCode"
					label="Category"
					className="md:w-2/3 xs:w-full"
					rules={[
						{
							required: true,
							message: "Question Category Code not null",
						},
					]}
				>
					<Select options={listCategory} />
				</Form.Item>
				<Form.Item
					name="shortDescription"
					label="Short Description"
					className="md:w-2/3 xs:w-full"
				>
					<Input.TextArea />
				</Form.Item>
				<Form.Item
					name="content"
					label="Content"
					className="md:w-2/3 xs:w-full"
					rules={[
						{
							required: true,
							message: "Content is require!",
						},
					]}
				>
					<TextEditorComponent />
				</Form.Item>
				<Form.List name="answers">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...resetField }) => (
								<Card
									key={key}
									className="mb-4 md:w-2/3"
									hoverable
									variant="borderless"
									extra={
										<CloseOutlined
											onClick={() => remove(name)}
										/>
									}
								>
									<>
										<Form.Item
											{...resetField}
											hidden
											name={[name, "id"]}
										>
											<Input />
										</Form.Item>
										<Form.Item
											{...resetField}
											labelCol={{ lg: 4, xs: 24 }}
											wrapperCol={{ lg: 20, xs: 24 }}
											name={[name, "content"]}
											label="Content"
											rules={[
												{
													required: true,
													message:
														"Answer content is require!",
												},
											]}
										>
											<TextEditorComponent
												onChange={(content) =>
													form.setFieldsValue({
														answers: form
															.getFieldValue(
																"answers"
															)
															.map(
																(
																	item: any,
																	index: number
																) =>
																	index ===
																	name
																		? {
																				...item,
																				content,
																		  }
																		: item
															),
													})
												}
											/>
										</Form.Item>
										<Form.Item
											name={[name, "isCorrect"]}
											label="Is Correct"
											labelCol={{ lg: 4, xs: 24 }}
											wrapperCol={{ lg: 20, xs: 24 }}
										>
											<Switch />
										</Form.Item>
									</>
								</Card>
							))}
							<Button
								type="dashed"
								color="green"
								className="my-3"
								onClick={() => add()}
								icon={<PlusOutlined />}
							>
								Add Answer
							</Button>
						</>
					)}
				</Form.List>
				<Form.Item className="mt-4">
					<Button
						icon={<PlusOutlined />}
						htmlType="submit"
						type="primary"
					>
						Update Question
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}
