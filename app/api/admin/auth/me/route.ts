import { NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/auth";

export async function GET() {
  const payload = await getAuthFromCookies();
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user: payload });
}
