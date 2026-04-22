import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings, { DEFAULT_SETTINGS } from "@/models/SiteSettings";

export const revalidate = 60;

export async function GET() {
  try {
    await dbConnect();
    const settings = await SiteSettings.findOne().lean();
    return NextResponse.json(settings || DEFAULT_SETTINGS);
  } catch {
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}
