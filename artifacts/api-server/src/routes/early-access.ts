import { Router } from "express";
import { db } from "@workspace/db";
import { earlyAccessLeads, insertEarlyAccessLeadSchema } from "@workspace/db";

const router = Router();

/**
 * POST /api/early-access
 *
 * Intended Firestore security rule (for future Firebase migration):
 *   allow create: if request.resource.data.keys().hasOnly(['name','email','source','launchCampaign','createdAt'])
 *     && request.resource.data.name is string && request.resource.data.name.size() < 121
 *     && request.resource.data.email is string && request.resource.data.email.size() < 255
 *     && !exists(path); // deterministic doc ID from normalized email prevents updates
 *
 * Currently persisting to Replit PostgreSQL (earlyAccessLeads table).
 */
router.post("/early-access", async (req, res) => {
  const parsed = insertEarlyAccessLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
  }

  const { name, email, source, launchCampaign } = parsed.data;

  try {
    await db.insert(earlyAccessLeads).values({ name, email, source, launchCampaign });
    return res.status(201).json({ success: true });
  } catch (err: unknown) {
    const pgCode =
      (err as { code?: string })?.code ??
      (err as { cause?: { code?: string } })?.cause?.code;
    if (pgCode === "23505") {
      return res.status(409).json({ error: "duplicate", message: "Email already registered." });
    }
    req.log?.error({ err }, "early-access insert failed");
    return res.status(500).json({ error: "internal_error" });
  }
});

export default router;
