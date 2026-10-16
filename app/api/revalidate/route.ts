import { createHash, timingSafeEqual } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { SITE_CONTENT_TAG } from "@/lib/site-content";

// Called by SAG right after content is published there, so the change goes
// live within seconds instead of at the next hourly refresh. Authenticated
// with the same shared WEBSITE_API_KEY the site uses to call SAG.
export const runtime = "nodejs";

const digest = (value: string) => createHash("sha256").update(value).digest();

export async function POST(req: Request) {
  const expected = process.env.WEBSITE_API_KEY;
  const provided = req.headers.get("x-website-key");
  if (!expected || !provided || !timingSafeEqual(digest(provided), digest(expected))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(SITE_CONTENT_TAG);
  // Every page reads site content through the shared layout.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
