"use server";

import { cookies } from "next/headers";

export default async function GetToken() {
    return (await cookies()).get('token')?.value;
}