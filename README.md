# Sky Accelerate Group — Corporate Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Built to be deployed on Vercel and connected to skyaccelerate.com.

## Design system (v2 — revised after brand review)
- **Palette**: warm paper background (`paper` / `paper-dim`) as the dominant surface, with deep navy (`navy`) reserved for the hero, footer and closing CTA only — not stacked dark section after dark section.
- **Type**: Newsreader (serif, headings + pull quotes) paired with Work Sans (body/UI). No monospace anywhere.
- **Signature motif**: a small triangular "peak" mark (`<Chevron />` in `components/Bits.tsx`), lifted directly from the "A" in the Sky Accelerate Group wordmark. Used as a bullet, divider and hero watermark — replacing the earlier `REF/001`-style tags, which read as generic/AI-templated.
- **Numbering**: only used where content is a genuine sequence (the 5-step process, the 2023→2026 timeline). Non-sequential content (differentiators, services, values) uses flowing lists instead of numbered/boxed grids.
- **Logo**: the real Sky Accelerate Group logo is in `public/brand/`:
  - `logo-full.png` — full lockup (mark + wordmark), used in the header on the light background.
  - `logo-mark.png` — mark only, cropped so it stays legible on the dark footer (the wordmark text in the original file is dark navy and disappears on a dark background).

## Pages (V1 — all 10 complete)
- Home (/)
- About (/about)
- Services (/services)
- CIDB Advisory (/cidb-advisory)
- Case Reviews (/case-reviews)
- Insights (/insights)
- Contact (/contact)
- Privacy Policy (/privacy-policy)
- Terms of Use (/terms-of-use)
- Disclaimer (/disclaimer)

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploying
Push to a Git repo and import the project into Vercel, or run:
```bash
npm run build
```
Then connect the `skyaccelerate.com` domain in the Vercel dashboard.

## Editable content (managed in SAG)
Company info, services, case reviews, insights, core values, process steps,
timeline and the contact-form service options are edited in SAG
(admin.skyaccelerate.com → Marketing → Website Content) and published from
there. `lib/site-content.ts` loads the published content and merges it over
the built-in defaults in `lib/site-config.ts` / `lib/site-config.zh.ts`.

- Pages are static and refresh hourly; publishing in SAG calls
  `/api/revalidate`, so changes show up within seconds.
- If SAG is unreachable the last cached copy keeps being served; with no
  cached copy (or SAG not configured) the built-in config is used.
- Navigation, legal links and the domain stay in `lib/site-config.ts`.

## Contact form
Submissions go to SAG (as CRM leads, source "Website") and, as a backup, by
email to the enquiry address via Resend. The form succeeds if either works.

## Environment variables
See `.env.local.example`: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
`SAG_API_URL`, `WEBSITE_API_KEY` (must match SAG's backend).

## Next steps / not yet built
- If you get a version of the logo with a light/reversed wordmark, swap it
  into the footer (`components/Footer.tsx`) for a cleaner lockup than the
  mark-only crop currently used there.
- Team members, awards, client logos, testimonials and statistics were
  deliberately omitted (placeholder policy) — add only when real data is
  available.
- Future expansion (client portal, application status, document upload,
  CRM integration) is not built, but the architecture (App Router,
  centralized config, component structure) will not block adding it later.
