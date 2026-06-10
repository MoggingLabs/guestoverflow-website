"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { getDb } from "@/lib/db";

export async function updateLeadStatus(
  id: number,
  status: "new" | "contacted" | "closed",
): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;
  await sql`update leads set status = ${status} where id = ${id}`;
  revalidatePath("/admin/leads");
}
