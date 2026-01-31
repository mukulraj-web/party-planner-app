import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  try {
    // 1️⃣ Read Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = verifyToken(token);

    // 4️⃣ Attach user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user", JSON.stringify(decoded));

    // 5️⃣ Allow request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
export const config = {
  matcher: [
    "/api/party/:path*",
    "/api/recipe/:path*",
    "/api/user/:path*",
  ],
};
