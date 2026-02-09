import { NextResponse } from "next/server";
import { routesCatalog } from "@/data/routesCatalog";

export function GET() {
  return NextResponse.json({ routes: routesCatalog });
}
