import { NextResponse } from "next/server";

// Simple in-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Strip < and > to prevent basic HTML injection
    .trim();
}

export async function POST(request: Request) {
  try {
    // 1. Rate limiting check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const recentTimestamps = timestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );

    if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a minute before submitting again.",
        },
        { status: 429 }
      );
    }

    recentTimestamps.push(now);
    rateLimitMap.set(ip, recentTimestamps);

    // 2. Parse body
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // 3. Honeypot check for bots
    if (body.website || body.honeypot) {
      // Fake successful response for automated spammers
      return NextResponse.json(
        {
          success: true,
          message: "Thanks! Your inquiry has been received.",
          id: `inquiry_${Date.now()}`,
        },
        { status: 200 }
      );
    }

    // 4. Sanitize and extract
    const name = sanitize(body.name);
    const email = sanitize(body.email).toLowerCase();
    const company = sanitize(body.company);
    const phone = sanitize(body.phone);
    const service = sanitize(body.service || body.projectType);
    const budget = sanitize(body.budget);
    const details = sanitize(body.details);

    // 5. Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    if (phone && !PHONE_PATTERN.test(phone.replace(/\s+/g, ""))) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone or WhatsApp number." },
        { status: 400 }
      );
    }

    if (!details || details.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please share a few more details about your project (at least 10 characters).",
        },
        { status: 400 }
      );
    }

    // 6. Success log & response
    const inquiryId = `pt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    console.info(`[Contact Form Submission] ID: ${inquiryId}`, {
      name,
      email,
      company: company || "N/A",
      phone: phone || "N/A",
      service: service || "General Inquiry",
      budget: budget || "Not Specified",
      detailsLength: details.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thanks! Your inquiry has been received. Our team will review your project and get back to you shortly.",
        id: inquiryId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while submitting your message. Please try again.",
      },
      { status: 500 }
    );
  }
}
