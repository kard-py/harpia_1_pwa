import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const appURL = new URL("/app", request.url);

  if (request.nextUrl.pathname == "/") {
    return NextResponse.redirect(appURL);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
