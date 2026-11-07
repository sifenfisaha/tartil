/**
 * TARTĪL. — the Ī sits in its own span on purpose: Jost kerns the Ī–L pair so
 * tightly that the macron lands on the L. Isolating the glyph drops that kern,
 * and a hair of margin evens out the spacing.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <span className="sr-only">Tartīl</span>
      <span aria-hidden>
        TART<span className="mx-[0.06em]">Ī</span>L.
      </span>
    </span>
  );
}
