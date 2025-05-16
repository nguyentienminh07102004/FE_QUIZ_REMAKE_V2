"use client";

import { Button } from "antd";
import { ButtonColorType } from "antd/es/button";

export default function ButtonNavigation({
	href,
	content,
	color,
}: {
	href: string;
	content?: string;
	color?: ButtonColorType;
}) {
	return (
		<>
			<Button href={href} color={color || "blue"} variant="solid">
				{content || "Navigation"}
			</Button>
		</>
	);
}
