import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";

// Resolve database storage path in a stable directory
const DB_DIR = path.resolve(process.cwd(), "database");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, "parthav.sqlite");

// Global singleton to prevent multiple open handles during Next.js hot reloads
const globalForDb = globalThis as unknown as {
  __parthav_db?: DatabaseSync;
};

export function getDb(): DatabaseSync {
  if (!globalForDb.__parthav_db) {
    const db = new DatabaseSync(DB_PATH);
    
    // Enable WAL mode and foreign keys for high performance and durability
    db.exec("PRAGMA journal_mode = WAL;");
    db.exec("PRAGMA foreign_keys = ON;");
    
    // Initialize schema
    initSchema(db);
    
    // Auto-seed initial administrator and sample dataset if empty
    seedInitialData(db);
    
    globalForDb.__parthav_db = db;
  }
  return globalForDb.__parthav_db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Administrator',
      avatar_url TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      last_login_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      inquiry_code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      service TEXT NOT NULL DEFAULT 'Web Development',
      budget TEXT,
      details TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'Contact Form',
      status TEXT NOT NULL DEFAULT 'New',
      assigned_to TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inquiry_notes (
      id TEXT PRIMARY KEY,
      inquiry_id TEXT NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
      author_name TEXT NOT NULL,
      note TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL DEFAULT 'Active',
      source_page TEXT NOT NULL DEFAULT '/',
      consent_given INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      actor_name TEXT NOT NULL DEFAULT 'System',
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      entity_type TEXT,
      entity_id TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
    CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
    CREATE INDEX IF NOT EXISTS idx_inquiries_service ON inquiries(service);
    CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at);
  `);
}

function seedInitialData(db: DatabaseSync) {
  // Check if admin user already exists
  const userCheck = db.prepare("SELECT COUNT(*) as count FROM admin_users;").get() as { count: number };
  if (userCheck.count === 0) {
    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = crypto.scryptSync("admin123", salt, 64).toString("hex");
    const now = new Date().toISOString();

    const insertUser = db.prepare(`
      INSERT INTO admin_users (id, name, email, password_hash, salt, role, avatar_url, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?);
    `);

    insertUser.run(
      "usr_rahul_admin",
      "Rahul Kumawat",
      "admin@parthavtechnologies.com",
      passwordHash,
      salt,
      "Administrator",
      "/images/hero/avatar-1.webp",
      now,
      now
    );
  }

  // Check if inquiries exist
  const inqCheck = db.prepare("SELECT COUNT(*) as count FROM inquiries;").get() as { count: number };
  if (inqCheck.count === 0) {
    const insertInquiry = db.prepare(`
      INSERT INTO inquiries (id, inquiry_code, name, email, phone, company, service, budget, details, source, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `);

    // Baseline historical records matching the reference composition exactly
    const seedRecords = [
      {
        id: "inq_00124",
        code: "#INQ-00124",
        name: "Priya Sharma",
        email: "priya@company.com",
        phone: "+91 98290 12345",
        company: "Apex Global Dynamics",
        service: "AI & Automation",
        budget: "₹1,00,000–₹3,00,000",
        details: "Looking to deploy custom customer support AI workflow and internal knowledge base.",
        source: "Contact Form",
        status: "New",
        created_at: "2026-10-20T10:24:00.000Z",
      },
      {
        id: "inq_00123",
        code: "#INQ-00123",
        name: "Rajesh Mehta",
        email: "rajesh@tech.com",
        phone: "+91 94140 88291",
        company: "Mehta Software Labs",
        service: "Web Development",
        budget: "₹3,00,000+",
        details: "Need enterprise Next.js full-stack platform rewrite with cloud migration.",
        source: "Chat",
        status: "Contacted",
        created_at: "2026-10-19T16:12:00.000Z",
      },
      {
        id: "inq_00122",
        code: "#INQ-00122",
        name: "Amit Verma",
        email: "amit@business.in",
        phone: "+91 98281 44520",
        company: "Verma Retail Ventures",
        service: "SEO & Digital Growth",
        budget: "₹50,000–₹1,00,000",
        details: "Comprehensive technical SEO audit and ranking recovery across tier-1 cities.",
        source: "Contact Form",
        status: "Proposal Sent",
        created_at: "2026-10-19T11:05:00.000Z",
      },
      {
        id: "inq_00121",
        code: "#INQ-00121",
        name: "Neha Gupta",
        email: "neha@startup.com",
        phone: "+91 97852 90112",
        company: "Zenith FinTech",
        service: "UI/UX Design",
        budget: "₹1,00,000–₹3,00,000",
        details: "SaaS dashboard design system and interactive high-fidelity clickable prototype.",
        source: "Chat",
        status: "Qualified",
        created_at: "2026-10-18T15:45:00.000Z",
      },
      {
        id: "inq_00120",
        code: "#INQ-00120",
        name: "Vikram Singh",
        email: "vikram@retail.com",
        phone: "+91 99280 33140",
        company: "Heritage Handicrafts",
        service: "CRM & Automation",
        budget: "₹50,000–₹1,00,000",
        details: "WhatsApp automated sales lead pipeline and CRM integration for retail stores.",
        source: "Contact Form",
        status: "New",
        created_at: "2026-10-18T09:20:00.000Z",
      },
      {
        id: "inq_00119",
        code: "#INQ-00119",
        name: "Karan Malhotra",
        email: "karan@global.com",
        phone: "+91 98295 77610",
        company: "Malhotra Logistics",
        service: "Web Development",
        budget: "₹3,00,000+",
        details: "Custom shipment tracking web application with live driver portal.",
        source: "Contact Form",
        status: "Won",
        created_at: "2026-10-17T18:10:00.000Z",
      },
    ];

    for (const rec of seedRecords) {
      insertInquiry.run(
        rec.id,
        rec.code,
        rec.name,
        rec.email,
        rec.phone,
        rec.company,
        rec.service,
        rec.budget,
        rec.details,
        rec.source,
        rec.status,
        rec.created_at,
        rec.created_at
      );
    }

    // Seed historical volume across the month to create realistic chart distribution (124 total)
    const servicesPool = [
      "Web Development",
      "AI & Automation",
      "SEO & Digital Growth",
      "UI/UX Design",
      "CRM & Automation",
      "Others",
    ];
    const statusesPool = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];

    for (let i = 1; i <= 118; i++) {
      const day = Math.floor(Math.random() * 20) + 1; // 1 to 20 October
      const dateStr = `2026-10-${day.toString().padStart(2, "0")}T${Math.floor(Math.random() * 12 + 8).toString().padStart(2, "0")}:${Math.floor(Math.random() * 59).toString().padStart(2, "0")}:00.000Z`;
      const srv = servicesPool[i % servicesPool.length];
      const st = statusesPool[i % statusesPool.length];
      const src = i % 3 === 0 ? "Chat" : "Contact Form";
      const codeNum = (118 - i + 1).toString().padStart(5, "0");

      insertInquiry.run(
        `inq_hist_${i}`,
        `#INQ-${codeNum}`,
        `Client Inquiry ${i}`,
        `client${i}@domain.com`,
        null,
        `Enterprise Co ${i}`,
        srv,
        "₹50,000–₹1,00,000",
        "Project scope details recorded during engagement.",
        src,
        st,
        dateStr,
        dateStr
      );
    }

    // Seed activity records matching the reference image timeline
    const insertActivity = db.prepare(`
      INSERT INTO activities (id, actor_name, type, description, entity_type, entity_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `);

    const activitySeeds = [
      {
        id: "act_1",
        actor: "System",
        type: "INQUIRY_CREATED",
        desc: "New inquiry from Priya Sharma",
        entity_type: "Inquiry",
        entity_id: "inq_00124",
        time: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      {
        id: "act_2",
        actor: "Rahul Kumawat",
        type: "BLOG_PUBLISHED",
        desc: 'Blog post "AI for Business Growth" published',
        entity_type: "Post",
        entity_id: "post_ai_growth",
        time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: "act_3",
        actor: "System",
        type: "SUBSCRIBER_JOINED",
        desc: "Newsletter subscription from akash@company.com",
        entity_type: "Subscriber",
        entity_id: "sub_1",
        time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "act_4",
        actor: "Rahul Kumawat",
        type: "STATUS_UPDATED",
        desc: "Inquiry status updated to Contacted",
        entity_type: "Inquiry",
        entity_id: "inq_00123",
        time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "act_5",
        actor: "System",
        type: "INQUIRY_CREATED",
        desc: "New inquiry from Rajesh Mehta",
        entity_type: "Inquiry",
        entity_id: "inq_00123",
        time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    for (const a of activitySeeds) {
      insertActivity.run(a.id, a.actor, a.type, a.desc, a.entity_type, a.entity_id, a.time);
    }

    // Seed 312 newsletter subscribers
    const insertSub = db.prepare(`
      INSERT INTO subscribers (id, email, status, source_page, created_at, updated_at)
      VALUES (?, ?, 'Active', '/', ?, ?);
    `);

    insertSub.run("sub_akash", "akash@company.com", new Date().toISOString(), new Date().toISOString());
    for (let s = 1; s <= 311; s++) {
      insertSub.run(`sub_${s}`, `subscriber${s}@audience.io`, new Date().toISOString(), new Date().toISOString());
    }
  }
}
