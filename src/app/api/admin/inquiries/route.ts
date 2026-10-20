import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "10", 10)));
  const offset = (page - 1) * limit;

  const search = searchParams.get("search")?.trim() || "";
  const status = searchParams.get("status")?.trim() || "";
  const service = searchParams.get("service")?.trim() || "";
  const source = searchParams.get("source")?.trim() || "";

  const db = getDb();

  const whereClauses: string[] = [];
  const params: (string | number)[] = [];

  if (search) {
    whereClauses.push(
      "(name LIKE ? OR email LIKE ? OR inquiry_code LIKE ? OR company LIKE ?)"
    );
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  if (status && status !== "All") {
    whereClauses.push("status = ?");
    params.push(status);
  }

  if (service && service !== "All") {
    whereClauses.push("service = ?");
    params.push(service);
  }

  if (source && source !== "All") {
    whereClauses.push("source = ?");
    params.push(source);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const countRow = db
    .prepare(`SELECT COUNT(*) as total FROM inquiries ${whereSql};`)
    .get(...params) as { total: number };

  const items = db
    .prepare(
      `SELECT id, inquiry_code as inquiryCode, name, email, phone, company, service, budget, details, source, status, created_at as createdAt, updated_at as updatedAt
       FROM inquiries 
       ${whereSql} 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?;`
    )
    .all(...params, limit, offset);

  return NextResponse.json({
    success: true,
    data: {
      items,
      pagination: {
        total: countRow.total,
        page,
        limit,
        totalPages: Math.ceil(countRow.total / limit),
      },
    },
  });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const service = String(body.service || "Web Development").trim();
    const phone = body.phone ? String(body.phone).trim() : null;
    const company = body.company ? String(body.company).trim() : null;
    const budget = body.budget ? String(body.budget).trim() : "Prefer to discuss";
    const details = String(body.details || "Manual inquiry entered by administrator.").trim();
    const status = String(body.status || "New").trim();
    const source = String(body.source || "Manual").trim();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const db = getDb();
    const countRow = db.prepare("SELECT COUNT(*) as count FROM inquiries;").get() as { count: number };
    const nextCodeNumber = countRow.count + 1;
    const inquiryCode = `#INQ-${nextCodeNumber.toString().padStart(5, "0")}`;
    const id = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO inquiries (id, inquiry_code, name, email, phone, company, service, budget, details, source, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `).run(
      id,
      inquiryCode,
      name,
      email,
      phone,
      company,
      service,
      budget,
      details,
      source,
      status,
      now,
      now
    );

    // Log Activity
    db.prepare(`
      INSERT INTO activities (id, actor_name, type, description, entity_type, entity_id, created_at)
      VALUES (?, ?, 'INQUIRY_CREATED', ?, 'Inquiry', ?, ?);
    `).run(`act_${Date.now()}`, user.name, `New inquiry for ${name} added by ${user.name}`, id, now);

    return NextResponse.json({
      success: true,
      message: "Inquiry created successfully.",
      data: { id, inquiryCode },
    });
  } catch (error) {
    console.error("[Create Inquiry Error]", error);
    return NextResponse.json({ success: false, error: "Failed to create inquiry." }, { status: 500 });
  }
}
