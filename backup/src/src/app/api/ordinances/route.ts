import { NextResponse } from "next/server";
import { layerData } from "@/data/mapLayers";

export function GET() {
  return NextResponse.json(layerData.ordinances);
}
