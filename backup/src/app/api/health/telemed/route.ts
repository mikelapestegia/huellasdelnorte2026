import { NextResponse } from "next/server";
import { telemedSessions } from "@/data/telemedSessions";

export function GET() {
  return NextResponse.json({ sessions: telemedSessions });
}
