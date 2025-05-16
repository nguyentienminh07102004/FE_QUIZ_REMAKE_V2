import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/admin")) {
		const token: RequestCookie | undefined = request.cookies.get("token");
		if (token === undefined) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}
	const headers = new Headers(request.headers);
	headers.set("next-url", request.nextUrl.pathname);
	return NextResponse.next({
		request: {
			headers: headers,
		},
	});
}

export const config = {
	matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
