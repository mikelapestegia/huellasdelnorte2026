import { NextResponse } from "next/server";
import { carRentalPolicies } from "@/data/ingest/car_rental";

export function GET() {
  return NextResponse.json({ policies: carRentalPolicies });
}
