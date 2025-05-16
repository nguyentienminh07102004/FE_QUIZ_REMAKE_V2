import { LoginGoogle } from "@/apis/UserService";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function ButtonLoginGoogle() {
	const searchParams = useSearchParams();
	const clientId: string =
		"88334881570-ccdm2ocen6j2d3v6ro5ldpcegl69ot5s.apps.googleusercontent.com";
	const scope: string =
		"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
	const redirect_uri = "http://localhost:3000/login";
	const url: string = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code&prompt=consent select_account`;
	React.useEffect(() => {
		const code: string | null = searchParams.get("code");
		if (code !== null) {
			const loginGoogle2 = async () => {
				await LoginGoogle({ code });
			};
			loginGoogle2();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div
				className="px-5 py-3 bg-green-400 mt-5 flex justify-center gap-3 rounded-md cursor-pointer items-center text-lg"
				onClick={() => (window.location.href = url)}
			>
				<FcGoogle className="text-2xl" /> Continue with Google
			</div>
		</>
	);
}
