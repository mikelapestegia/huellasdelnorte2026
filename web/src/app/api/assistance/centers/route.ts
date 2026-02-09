import { NextResponse } from "next/server";
import { assistanceCenters } from "@/data/ingest/assistance_centers";

export function GET() {
  return NextResponse.json({ centers: assistanceCenters });
}
