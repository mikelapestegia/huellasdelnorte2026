import { NextResponse } from "next/server";
import { insurancePolicies } from "@/data/insurancePolicies";

export function GET() {
  return NextResponse.json({ policies: insurancePolicies });
}
