import { NextResponse } from "next/server";
import { triageSessions } from "@/data/triageSessions";

export function GET() {
  return NextResponse.json({ sessions: triageSessions });
}
