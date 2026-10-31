import Link from "next/link";
import { type PaginationProps } from "@/types/types";

function hrefFor(page: number, genre?: string) {
  const params = new URLSearchParams();
  if (genre) params.set("genre", genre);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/movies?${qs}` : "/movies";
}

function pageList(page: number, total: number): (number | "…")[] {
  const wanted = [1, page - 1, page, page + 1, total]
    .filter((p) => p >= 1 && p <= total)
    .filter((p, i, arr) => arr.indexOf(p) === i)
    .sort((a, b) => a - b);

  const out: (number | "…")[] = [];
  wanted.forEach((p, i) => {
    const prev = wanted[i - 1];
    if (prev !== undefined) {
      if (p - prev === 2) out.push(prev + 1);
      else if (p - prev > 2) out.push("…");
    }
    out.push(p);
  });
  return out;
}

const base = "rounded-full px-4 py-1.5 font-bold transition-transform";

export default function Pagination({
  page,
  totalPages,
  genre,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-wrap items-center justify-center gap-2.5"
    >
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1, genre)}
          className={`${base} glass-pill hover:-translate-y-0.5`}
        >
          ← Prev
        </Link>
      ) : (
        <span
          aria-disabled="true"
          role="link"
          className={`${base} glass-pill opacity-40`}
        >
          ← Prev
        </span>
      )}

      {pageList(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-1 font-bold text-ink-soft">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(p, genre)}
            aria-current={p === page ? "page" : undefined}
            className={`${base} ${p === page ? "glass-pill-active" : "glass-pill hover:-translate-y-0.5"}`}
          >
            {p}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1, genre)}
          className={`${base} glass-pill hover:-translate-y-0.5`}
        >
          Next →
        </Link>
      ) : (
        <span
          aria-disabled="true"
          role="link"
          className={`${base} glass-pill opacity-40`}
        >
          Next →
        </span>
      )}
    </nav>
  );
}
