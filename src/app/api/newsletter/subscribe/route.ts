import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const sourcePage = typeof body?.sourcePage === "string" ? body.sourcePage.trim() : "/";

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const db = getDb();
    const existing = db
      .prepare("SELECT id, status FROM subscribers WHERE email = ? LIMIT 1;")
      .get(email) as { id: string; status: string } | undefined;

    const now = new Date().toISOString();

    if (existing) {
      if (existing.status === "Unsubscribed") {
        db.prepare("UPDATE subscribers SET status = 'Active', updated_at = ? WHERE id = ?;").run(
          now,
          existing.id
        );
      }
      return NextResponse.json({
        success: true,
        message: "You are subscribed to the Parthav Technologies newsletter.",
      });
    }

    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    db.prepare(`
      INSERT INTO subscribers (id, email, status, source_page, consent_given, created_at, updated_at)
      VALUES (?, ?, 'Active', ?, 1, ?, ?);
    `).run(id, email, sourcePage, now, now);

    // Log Activity
    db.prepare(`
      INSERT INTO activities (id, actor_name, type, description, entity_type, entity_id, created_at)
      VALUES (?, 'System', 'SUBSCRIBER_JOINED', ?, 'Subscriber', ?, ?);
    `).run(`act_${Date.now()}`, `Newsletter subscription from ${email}`, id, now);

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Parthav Technologies insights.",
    });
  } catch (error) {
    console.error("[Newsletter API Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
