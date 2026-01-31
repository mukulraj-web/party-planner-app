// import { sucessRespose } from "@/lib/response"
// export function GET() {
//     return sucessRespose("server is running",202)
// }


import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    message: "API is working"
  });
}
