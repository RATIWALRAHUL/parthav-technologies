import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const admin = await getCurrentUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const stmt = db.prepare(`
      SELECT id, name, email, role, avatar_url, is_active, last_login_at, created_at
      FROM admin_users
      ORDER BY created_at ASC
    `);
    const users = stmt.all();

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Failed to fetch admin users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Role check: Only Super Admin or Administrator can create users
    if (admin.role !== "Super Admin" && admin.role !== "Administrator") {
      return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
    }

    const body = await req.json();
    const { name, email, password, role = "Administrator" } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    const db = getDb();

    // Check if user already exists
    const existing = db.prepare("SELECT id FROM admin_users WHERE email = ?").get(email.toLowerCase().trim());
    if (existing) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    const { hash, salt } = hashPassword(password);
    const userId = crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO admin_users (id, name, email, password_hash, salt, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
    `).run(userId, name.trim(), email.toLowerCase().trim(), hash, salt, role, now, now);

    // Record activity
    db.prepare(`
      INSERT INTO activities (id, actor_name, action_type, entity_type, entity_id, description, created_at)
      VALUES (?, ?, 'USER_CREATED', 'AdminUser', ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      admin.name,
      userId,
      `Created user account for ${name} (${role})`,
      now
    );

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name,
        email: email.toLowerCase().trim(),
        role,
        is_active: 1,
        created_at: now,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
