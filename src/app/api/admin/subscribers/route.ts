import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  const db = getDb();

  const subscribers = db
    .prepare(
      `SELECT id, email, status, source_page as sourcePage, created_at as createdAt 
       FROM subscribers 
       ORDER BY created_at DESC;`
    )
    .all() as { id: string; email: string; status: string; sourcePage: string; createdAt: string }[];

  if (format === "csv") {
    let csv = "ID,Email,Status,Source Page,Subscribed At\n";
    for (const sub of subscribers) {
      csv += `"${sub.id}","${sub.email}","${sub.status}","${sub.sourcePage}","${sub.createdAt}"\n`;
    }

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="parthav_subscribers.csv"',
      },
    });
  }

  return NextResponse.json({ success: true, data: subscribers, total: subscribers.length });
}
