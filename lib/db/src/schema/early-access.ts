import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const earlyAccessLeads = pgTable("early_access_leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("daszz-launch-page"),
  launchCampaign: text("launch_campaign").notNull().default("june-2026"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertEarlyAccessLeadSchema = createInsertSchema(earlyAccessLeads)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().toLowerCase().email().max(254),
    source: z.string().default("daszz-launch-page"),
    launchCampaign: z.string().default("june-2026"),
  });

export type InsertEarlyAccessLead = z.infer<typeof insertEarlyAccessLeadSchema>;
export type EarlyAccessLead = typeof earlyAccessLeads.$inferSelect;
