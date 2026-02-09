import { NextResponse } from "next/server";
import { legalRequirements } from "@/data/legalRequirements";

export function GET() {
  return NextResponse.json({ requirements: legalRequirements });
}
