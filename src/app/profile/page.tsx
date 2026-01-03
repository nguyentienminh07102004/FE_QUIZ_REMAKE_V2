import GetToken from "@/commons/utils/GetToken";
import ProfileComponent from "./ProfileComponent";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const token = await GetToken();
	if (!token) {
		redirect('/login');
	}
	return (
		<>
			<ProfileComponent token={token}/>
		</>
	);
}
