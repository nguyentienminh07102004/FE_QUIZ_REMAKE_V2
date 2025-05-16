"use client";
import { LoginAPI } from "@/apis/UserService";
import ButtonLoginGoogle from "@/app/login/ButtonLoginGoogle";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { Form } from "radix-ui";
import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const emailInput = React.useRef<HTMLInputElement>(null);
	const passwordInput = React.useRef<HTMLInputElement>(null);
	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await LoginAPI({email: emailInput.current?.value, password: passwordInput.current?.value});
	};
	return (
		<>
			<div className="w-screen h-screen bg-[url(https://p.w3layouts.com/demos/aug-2016/19-08-2016/classy_login_form/web/images/banner1.jpg)] font-mono bg-center bg-cover flex justify-center items-center flex-col">
				<Form.Root
					className="flex justify-center flex-col"
					onSubmit={login}
				>
					<Text className="text-center text-[3rem] text-white">
						LOGIN
					</Text>
					<div>
						<Form.Field
							name="email"
							className="grid grid-cols-2 px-2 py-1 border-b-2 border-black"
						>
							<Form.Label className="px-5 py-2 rounded-md text-xl">
								Email:
							</Form.Label>
							<Form.Control asChild>
								<input
									name="email"
									type="email"
									placeholder="Email..."
									className="bg-transparent placeholder:text-white outline-none text-xl text-white"
									ref={emailInput}
									autoComplete="off"
								/>
							</Form.Control>
						</Form.Field>
						<Form.Field
							name="password"
							className="grid grid-cols-2 px-2 py-1 border-b-2 border-black"
						>
							<Form.Label className="px-5 py-2 rounded-md text-xl">
								Password:
							</Form.Label>
							<div className="flex justify-center items-center">
								<Form.Control
									asChild
									className="flex justify-between items-center"
								>
									<input
										name="password"
										type={
											showPassword ? "text" : "password"
										}
										placeholder="Password..."
										className="bg-transparent placeholder:text-white outline-none text-xl text-white"
										ref={passwordInput}
										autoComplete="off"
									/>
								</Form.Control>
								{showPassword ? (
									<AiOutlineEyeInvisible
										className="text-xl cursor-pointer stroke-white"
										onClick={() =>
											setShowPassword(!showPassword)
										}
									/>
								) : (
									<AiOutlineEye
										className="text-xl cursor-pointer stroke-white"
										onClick={() =>
											setShowPassword(!showPassword)
										}
									/>
								)}
							</div>
						</Form.Field>
						<Form.Submit asChild>
							<button
								type="submit"
								className="w-full bg-[#FF3366] py-2 rounded-md mt-3"
							>
								Login
							</button>
						</Form.Submit>
						<ButtonLoginGoogle />
					</div>
				</Form.Root>
				<div className="mt-3 text-blue-200">
					<Link href="/register">You don't have account? Register</Link>
				</div>
			</div>
		</>
	);
}
