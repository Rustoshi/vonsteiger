import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings, { DEFAULT_SETTINGS } from "@/models/SiteSettings";

export async function GET() {
  try {
    await dbConnect();
    const settings = await SiteSettings.findOne().lean();
    return NextResponse.json({ settings: settings || DEFAULT_SETTINGS });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      {
        generalEmail: body.generalEmail,
        generalPhone: body.generalPhone,
        offices: body.offices,
      },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
