import { NextResponse } from "next/server";
import { layerConfigs, layerData } from "@/data/mapLayers";

export function GET() {
  return NextResponse.json({
    layers: layerConfigs,
    data: layerData,
  });
}
