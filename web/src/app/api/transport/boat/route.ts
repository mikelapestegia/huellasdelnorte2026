import { NextResponse } from "next/server";
import { boatTransportPolicies } from "@/data/ingest/boat_transport";

export function GET() {
  return NextResponse.json({ policies: boatTransportPolicies });
}
