export function isHot(text: string): boolean {
  return /today|days left|closed|^new$/i.test(text);
}

export function Mark({ text }: { text: string }) {
  const hot = isHot(text);
  return (
    <span
      className={
        "inline-flex items-center px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide " +
        (hot ? "bg-maroon text-cream" : "bg-[#f3f1ee] text-ink")
      }
    >
      {text}
    </span>
  );
}