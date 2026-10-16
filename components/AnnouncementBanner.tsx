import { Link } from "@/i18n/navigation";
import type { Announcement } from "@/lib/site-content";

// Site-wide notice bar, switched on/off from SAG (Website Content →
// Announcement Banner).
export default function AnnouncementBanner({ announcement }: { announcement: Announcement }) {
  if (!announcement.enabled || !announcement.message) return null;

  const { message, linkLabel, linkHref } = announcement;
  const linkClass = "ml-2 underline underline-offset-2 hover:text-paper whitespace-nowrap";

  return (
    <div className="bg-navy-700 text-paper/90 text-sm" role="region" aria-label="Announcement">
      <div className="container-content py-2.5 text-center leading-relaxed">
        {message}
        {linkHref &&
          (linkHref.startsWith("/") ? (
            <Link href={linkHref} className={linkClass}>
              {linkLabel || "→"}
            </Link>
          ) : (
            <a href={linkHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {linkLabel || "→"}
            </a>
          ))}
      </div>
    </div>
  );
}
