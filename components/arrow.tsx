/** Hairline arrow drawn to sit on the text baseline at small sizes. */
export function Arrow({
  direction = "up-right",
  className = "",
}: {
  direction?: "up-right" | "down";
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 10"
      className={`size-[0.7em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="square"
    >
      {direction === "up-right" ? (
        <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" />
      ) : (
        <path d="M5 1.5v7M2 5.5l3 3 3-3" />
      )}
    </svg>
  );
}
