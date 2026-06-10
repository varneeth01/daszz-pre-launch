import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const earlyAccessLeads = pgTable(
  "early_access_leads",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    source: text("source"),
    launchCampaign: text("launch_campaign"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [unique("early_access_leads_email_unique").on(t.email)],
);

export const insertEarlyAccessLeadSchema = createInsertSchema(earlyAccessLeads, {
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  source: z.string().max(120).optional(),
  launchCampaign: z.string().max(120).optional(),
}).omit({ id: true, createdAt: true });

export type InsertEarlyAccessLead = z.infer<typeof insertEarlyAccessLeadSchema>;
export type EarlyAccessLead = typeof earlyAccessLeads.$inferSelect;
