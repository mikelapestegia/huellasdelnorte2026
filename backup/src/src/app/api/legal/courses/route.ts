import { NextResponse } from "next/server";
import { responsibleCourses } from "@/data/responsibleCourses";

export function GET() {
  return NextResponse.json({ courses: responsibleCourses });
}
