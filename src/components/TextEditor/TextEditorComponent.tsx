import { Editor } from "@tinymce/tinymce-react";
import React from "react";

export default function TextEditorComponent({
	onChange,
	value,
}: {
	onChange?: (value: string) => void;
	value?: string;
}) {
	const editorRef = React.useRef<any>(null);
	React.useEffect(() => {
		if (editorRef.current && value !== editorRef.current.getContent()) {
			editorRef.current.setContent(value || "");
		}
	}, [value, editorRef.current]);
	return (
		<>
			<Editor
				apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
				onInit={(_: any, editor: any) => {
					editor.setContent(value || '');
					editorRef.current = editor;
				}}
				onEditorChange={onChange}
				init={{
					height: 200,
					menubar: false,
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"code",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"code",
						"help",
						"wordcount",
					],
					toolbar:
						"undo redo | blocks | fontsize | " +
						"bold italic forecolor | alignleft aligncenter " +
						"alignright alignjustify | bullist numlist outdent indent | " +
						"removeformat | image | code",
					file_picker_types: "image",
					file_picker_callback: (
						cb: (
							s: string | ArrayBuffer | null,
							config: any
						) => void
					) => {
						const input = document.createElement("input");
						input.setAttribute("type", "file");
						input.setAttribute("accept", "image/*");

						input.addEventListener("change", (e): void => {
							const files = e.target?.files;
							if (files) {
								const file = files[0];
								const reader = new FileReader();
								reader.addEventListener("load", () => {
									const id = "blobid" + new Date().getTime();
									const base64 = reader.result;
									cb(base64, { title: file.name });
								});
								reader.readAsDataURL(file);
							}
						});

						input.click();
					},
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				}}
			/>
		</>
	);
}
