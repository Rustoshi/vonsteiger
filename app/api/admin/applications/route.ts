import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import AssetRecoveryApplication from "@/models/AssetRecoveryApplication";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (status && status !== "all") filter.status = status;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { bankName: { $regex: search, $options: "i" } },
        { beneficiaryName: { $regex: search, $options: "i" } },
      ];
    }

    const [applications, total] = await Promise.all([
      AssetRecoveryApplication.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      AssetRecoveryApplication.countDocuments(filter),
    ]);

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Applications fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
