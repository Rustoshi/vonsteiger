/**
 * Admin Seeding Script
 *
 * Run with: npx tsx scripts/seed-admin.ts
 *
 * Creates the default superadmin account and initial site settings.
 * Safe to run multiple times — it will skip if the admin already exists.
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in .env");
  process.exit(1);
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@vonsteiger.law";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "VonSteiger2026!";
const ADMIN_NAME = process.env.ADMIN_NAME || "Julian von Steiger";

async function seed() {
  console.log("🔗 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI as string);
  console.log("✅ Connected\n");

  const db = mongoose.connection.db;
  if (!db) {
    console.error("❌ Database connection failed");
    process.exit(1);
  }

  // --- Seed Admin User ---
  console.log("👤 Seeding admin user...");
  const adminCollection = db.collection("adminusers");
  const existing = await adminCollection.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (existing) {
    console.log(`   ⏭️  Admin "${ADMIN_EMAIL}" already exists. Skipping.\n`);
  } else {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await adminCollection.insertOne({
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      name: ADMIN_NAME,
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`   ✅ Admin created: ${ADMIN_EMAIL}`);
    console.log(`   🔑 Password: ${ADMIN_PASSWORD}`);
    console.log(`   ⚠️  CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION!\n`);
  }

  // --- Seed Site Settings ---
  console.log("⚙️  Seeding site settings...");
  const settingsCollection = db.collection("sitesettings");
  const existingSettings = await settingsCollection.findOne();

  if (existingSettings) {
    console.log("   ⏭️  Site settings already exist. Skipping.\n");
  } else {
    await settingsCollection.insertOne({
      generalEmail: "contact@vonsteiger.law",
      generalPhone: "+49 (40) 123 456 789",
      offices: [
        {
          name: "Hamburg Office",
          street: "Neuer Wall 50",
          city: "Hamburg",
          postal: "20354",
          country: "DE",
          phone: "+49 (40) 123 456 789",
          email: "hamburg@vonsteiger.law",
          hours: "Mon–Fri: 08:00–18:00 CET",
        },
        {
          name: "Berlin Office",
          street: "Friedrichstraße 191",
          city: "Berlin",
          postal: "10117",
          country: "DE",
          phone: "+49 (30) 987 654 321",
          email: "berlin@vonsteiger.law",
          hours: "Mon–Fri: 08:00–18:00 CET",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("   ✅ Default site settings created.\n");
  }

  console.log("🎉 Seed complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Login URL:  http://localhost:3000/admin/login`);
  console.log(`Email:      ${ADMIN_EMAIL}`);
  console.log(`Password:   ${ADMIN_PASSWORD}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
