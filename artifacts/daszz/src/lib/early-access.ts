export type EarlyAccessStatus = "success" | "duplicate" | "error";

export interface EarlyAccessResult {
  status: EarlyAccessStatus;
}

export async function submitEarlyAccessLead(params: {
  name: string;
  email: string;
}): Promise<EarlyAccessResult> {
  const normalizedEmail = params.email.trim().toLowerCase();
  const name = params.name.trim();

  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

  const res = await fetch(`${base}/api/early-access`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email: normalizedEmail,
      source: "daszz-launch-page",
      launchCampaign: "june-2026",
    }),
  });

  if (res.status === 409) return { status: "duplicate" };
  if (!res.ok) return { status: "error" };
  return { status: "success" };
}
