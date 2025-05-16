"use server";
import GetToken from "@/commons/utils/GetToken";
import { redirect } from "next/navigation";
import ChatComponent from "./ChatComponent";

export default async function ChatPage() {
	const token: string | undefined = await GetToken();
	if (token === undefined) {
		redirect("/login");
	}

	return (
		<>
			<ChatComponent token={token} />
		</>
	);
}
