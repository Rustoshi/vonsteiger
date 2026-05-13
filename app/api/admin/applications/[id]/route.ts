import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import AssetRecoveryApplication from "@/models/AssetRecoveryApplication";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const application = await AssetRecoveryApplication.findById(id).lean();
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ application });
  } catch (error) {
    console.error("Application fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const allowedFields = ["status", "notes"];
    const updates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) updates[key] = body[key];
    }

    const application = await AssetRecoveryApplication.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).lean();
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ application });
  } catch (error) {
    console.error("Application update error:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const result = await AssetRecoveryApplication.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
