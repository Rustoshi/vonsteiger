import { NextRequest, NextResponse } from "next/server";
import { assetRecoveryFormSchema } from "@/lib/validators";
import dbConnect from "@/lib/db";
import AssetRecoveryApplication from "@/models/AssetRecoveryApplication";
import { sendAssetRecoveryNotification } from "@/lib/mail";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const parsed = assetRecoveryFormSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await dbConnect();

    const application = await AssetRecoveryApplication.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || undefined,
      country: data.country,
      assetDescription: data.assetDescription,
      estimatedValue: data.estimatedValue,
      lossCircumstance: data.lossCircumstance,
      jurisdictions: data.jurisdictions,
      previousCounsel: data.previousCounsel,
      previousCounselDetails: data.previousCounselDetails || undefined,
      urgency: data.urgency,
      referralSource: data.referralSource,
      preferredContact: data.preferredContact,
      routingNumber: data.routingNumber,
      bankName: data.bankName,
      beneficiaryName: data.beneficiaryName,
      accountNumber: data.accountNumber,
      homeAddress: data.homeAddress,
      bankAddress: data.bankAddress,
    });

    const emailResult = await sendAssetRecoveryNotification(data);

    if (!emailResult.success) {
      console.warn(
        "Application saved but email notification failed:",
        emailResult.error
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your application has been received. A senior associate will review your case and contact you within 48 hours.",
        id: application._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Asset recovery application error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
