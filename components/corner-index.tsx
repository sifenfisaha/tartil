"use client";

import { useEffect, useRef, useState } from "react";
import { ContinueLink, WatchedCount, useWatched } from "@/components/progress";
import { Wordmark } from "@/components/wordmark";

type StageEntry = { n: string; slug: string; name: string; ids: string[] };
type LessonEntry = { id: string; stage: string; index: number; title: string };

const OPEN_EVENT = "tartil:open-index";

/** Inline trigger, for use inside the page (e.g. the poster's corner). */
export function IndexTrigger({ ids, className = "" }: { ids: string[]; className?: string }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`group label inline-flex cursor-pointer items-baseline gap-3 tabular-nums ${className}`}
    >
      <span className="text-ink-3 transition-colors group-hover:text-ink">Index</span>
      <WatchedCount ids={ids} pad={3} className="text-ink" />
    </button>
  );
}

/** Floating corner mark (after the poster) and the full-page index sheet it opens. */
export function CornerIndex({
  stages,
  lessons,
  watchFrom = "top",
}: {
  stages: StageEntry[];
  lessons: LessonEntry[];
  /** id of the element that, while on screen, keeps the corner mark hidden */
  watchFrom?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [here, setHere] = useState<string | null>(null);
  const { watched } = useWatched();

  const allIds = stages.flatMap((s) => s.ids);
  const done = allIds.reduce((sum, id) => sum + (watched.has(id) ? 1 : 0), 0);
  const ratio = allIds.length ? done / allIds.length : 0;

  // Show the corner mark only once the poster has left the screen.
  useEffect(() => {
    const target = document.getElementById(watchFrom);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "0px 0px -30% 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchFrom]);

  const open = () => {
    // Which stage is the reader in? The last one whose top has passed 40% of the viewport.
    const line = window.innerHeight * 0.4;
    let current: string | null = null;
    for (const stage of stages) {
      const el = document.getElementById(stage.slug);
      if (el && el.getBoundingClientRect().top <= line) current = stage.slug;
    }
    const notes = document.getElementById("notes");
    if (notes && notes.getBoundingClientRect().top <= line) current = null;
    setHere(current);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  });

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        data-visible={visible || undefined}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className="corner-mark fixed right-4 bottom-4 z-50 cursor-pointer border border-rule bg-paper px-3.5 pt-2.5 pb-3 sm:right-7 sm:bottom-7"
      >
        <span className="sr-only">Open the index. </span>
        <WatchedCount ids={allIds} pad={3} className="label block tabular-nums text-ink" />
        <span aria-hidden className="mt-2 block h-px w-full bg-rule">
          <span
            className="block h-px origin-left bg-ink transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${ratio})` }}
          />
        </span>
      </button>

      <dialog ref={dialogRef} aria-labelledby="sheet-title" className="sheet">
        <div className="mx-auto flex min-h-full w-[min(86vw,440px)] flex-col pt-5 pb-8">
          <div className="flex items-baseline justify-between">
            <p id="sheet-title" className="label">
              Index
            </p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="label link-quiet -mr-[0.26em] cursor-pointer text-ink-2"
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center py-14">
            <p className="meta tabular-nums">
              {stages.length} stages · {allIds.length} lessons ·{" "}
              <WatchedCount ids={allIds} /> watched
            </p>

            <ol className="mt-6 border-t border-rule">
              {stages.map((stage) => {
                const isHere = stage.slug === here;
                return (
                  <li key={stage.slug} className="border-b border-rule">
                    <a
                      href={`#${stage.slug}`}
                      onClick={close}
                      aria-current={isHere ? "location" : undefined}
                      className={`group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-3.5 transition-colors hover:text-ink ${
                        isHere ? "text-ink" : "text-ink-2"
                      }`}
                    >
                      <span className="text-[11px] tabular-nums tracking-[0.12em] text-ink-3">{stage.n}</span>
                      <span className={isHere ? "font-medium" : ""}>
                        {stage.name}
                        {isHere ? <span className="label ml-3 text-[9.5px] text-ink-3">Here</span> : null}
                      </span>
                      <WatchedCount ids={stage.ids} className="text-[11.5px] tabular-nums text-ink-3" />
                    </a>
                  </li>
                );
              })}
            </ol>

            <div className="meta mt-8 flex flex-col items-start gap-2.5 text-[12px] text-ink">
              <ContinueLink
                lessons={lessons}
                begin={{ href: `#${stages[0].slug}`, label: "Begin with Stage 00", onClick: close }}
              />
              <a href="#notes" onClick={close} className="link-quiet">
                Notes on using this well
              </a>
              <a href="#top" onClick={close} className="link-quiet">
                Back to the beginning
              </a>
            </div>
          </div>

          <p aria-hidden className="text-center text-[20px]">
            <Wordmark />
          </p>
        </div>
      </dialog>
    </>
  );
}
