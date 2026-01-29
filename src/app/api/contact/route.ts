import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.debug("Contact form submission:", data);
  return NextResponse.json({ success: true });
}
