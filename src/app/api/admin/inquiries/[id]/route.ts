import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  const inquiry = db
    .prepare(
      `SELECT id, inquiry_code as inquiryCode, name, email, phone, company, service, budget, details, source, status, assigned_to as assignedTo, created_at as createdAt, updated_at as updatedAt
       FROM inquiries WHERE id = ? OR inquiry_code = ? LIMIT 1;`
    )
    .get(id, id);

  if (!inquiry) {
    return NextResponse.json({ success: false, error: "Inquiry not found." }, { status: 404 });
  }

  const notes = db
    .prepare(
      `SELECT id, author_name as authorName, note, created_at as createdAt 
       FROM inquiry_notes 
       WHERE inquiry_id = ? 
       ORDER BY created_at ASC;`
    )
    .all((inquiry as { id: string }).id);

  return NextResponse.json({
    success: true,
    data: {
      ...inquiry,
      notes,
    },
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const db = getDb();

  const existing = db
    .prepare("SELECT id, name, status FROM inquiries WHERE id = ? OR inquiry_code = ? LIMIT 1;")
    .get(id, id) as { id: string; name: string; status: string } | undefined;

  if (!existing) {
    return NextResponse.json({ success: false, error: "Inquiry not found." }, { status: 404 });
  }

  const now = new Date().toISOString();

  // If status change
  if (body.status && body.status !== existing.status) {
    db.prepare("UPDATE inquiries SET status = ?, updated_at = ? WHERE id = ?;").run(
      body.status,
      now,
      existing.id
    );

    db.prepare(`
      INSERT INTO activities (id, actor_name, type, description, entity_type, entity_id, created_at)
      VALUES (?, ?, 'STATUS_UPDATED', ?, 'Inquiry', ?, ?);
    `).run(
      `act_${Date.now()}`,
      user.name,
      `Inquiry status updated to ${body.status}`,
      existing.id,
      now
    );
  }

  // If adding note
  if (body.note && typeof body.note === "string") {
    db.prepare(`
      INSERT INTO inquiry_notes (id, inquiry_id, author_name, note, created_at)
      VALUES (?, ?, ?, ?, ?);
    `).run(`note_${Date.now()}`, existing.id, user.name, body.note.trim(), now);
  }

  return NextResponse.json({
    success: true,
    message: "Inquiry updated successfully.",
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  const existing = db
    .prepare("SELECT id, inquiry_code as inquiryCode FROM inquiries WHERE id = ? OR inquiry_code = ? LIMIT 1;")
    .get(id, id) as { id: string; inquiryCode: string } | undefined;

  if (!existing) {
    return NextResponse.json({ success: false, error: "Inquiry not found." }, { status: 404 });
  }

  db.prepare("DELETE FROM inquiries WHERE id = ?;").run(existing.id);

  // Log activity
  db.prepare(`
    INSERT INTO activities (id, actor_name, type, description, entity_type, entity_id, created_at)
    VALUES (?, ?, 'INQUIRY_DELETED', ?, 'Inquiry', ?, ?);
  `).run(`act_${Date.now()}`, user.name, `Inquiry ${existing.inquiryCode} deleted by ${user.name}`, existing.id, new Date().toISOString());

  return NextResponse.json({
    success: true,
    message: "Inquiry deleted successfully.",
  });
}
