import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import { sendContactNotification } from "@/lib/mail";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

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

    const parsed = contactFormSchema.safeParse(body);
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

    const contact = await Contact.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || undefined,
      subject: data.subject,
      message: data.message,
      preferredContact: data.preferredContact,
    });

    const emailResult = await sendContactNotification(data);

    if (!emailResult.success) {
      console.warn(
        "Contact saved but email notification failed:",
        emailResult.error
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We will respond within 24 hours.",
        id: contact._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
