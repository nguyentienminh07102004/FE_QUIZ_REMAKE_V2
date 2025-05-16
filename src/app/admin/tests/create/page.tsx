import FormCreateTestComponent from "@/app/admin/tests/create/FormCreateTest";
import { Tabs } from "antd";

export default function CreateTestPage() {
	return (
		<>
			<Tabs
				defaultActiveKey="form"
				centered
				items={[
					{
						label: `Create test with form`,
						key: "form",
						children: <FormCreateTestComponent />,
					},
					{
						label: "Create test with file excel",
						key: "file",
						
					}
				]}
			/>
		</>
	);
}
