import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyPassword, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid payload." }, { status: 400 });
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter your email and password." },
        { status: 400 }
      );
    }

    const db = getDb();
    const user = db
      .prepare(
        "SELECT id, name, email, password_hash, salt, role, avatar_url, is_active FROM admin_users WHERE email = ? LIMIT 1;"
      )
      .get(email) as
      | {
          id: string;
          name: string;
          email: string;
          password_hash: string;
          salt: string;
          role: string;
          avatar_url: string | null;
          is_active: number;
        }
      | undefined;

    if (!user || user.is_active !== 1) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials or account is inactive." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Update last login
    db.prepare("UPDATE admin_users SET last_login_at = ? WHERE id = ?;").run(
      new Date().toISOString(),
      user.id
    );

    // Issue session cookie
    await setSessionCookie(user.id);

    return NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatar_url,
      },
    });
  } catch (error) {
    console.error("[Login API Error]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
