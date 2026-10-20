import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const activities = db
    .prepare(
      `SELECT id, actor_name as actor, type, description, entity_type as entityType, entity_id as entityId, created_at as createdAt 
       FROM activities 
       ORDER BY created_at DESC 
       LIMIT 50;`
    )
    .all();

  return NextResponse.json({ success: true, data: activities });
}
